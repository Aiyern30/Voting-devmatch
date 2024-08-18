// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Election {
    // host
    address private host;
    uint electionReset = 0;

    // candidate
    struct Candidate_ {
        string name;
        uint id;                                                  
        uint voteCount;
    } Candidate_[] internal candidate;
    mapping(uint => bool) internal _candidate;
    uint[] internal candidateKeys;

    // voter
    mapping(uint => bool) internal TAC__;
    mapping(uint256 => bool) internal voters;
    uint[] internal storageTAC;
    uint[] internal tacKeys;

    modifier isHost {
        require(msg.sender == host, "Only host can access to this area!");
        _;
    }

    modifier isElection {
        require(block.timestamp < endTime, "Election has not started yet!");
        _;
    }

    constructor() {
        host = msg.sender;                                                          // set initial deployment person as host
        emit constructor_(host);                                                    
    }
    event constructor_ (address indexed host_);

    /*
    1 seconds   ==  1 seconds
    1 minutes   ==  60 seconds
    1 hours     ==  60 minutes == 3600 seconds
    1 days      ==  24 hours   == 86400 seconds
    1 weeks     == 7 days      == 604800 seconds
    */

   // election
    uint256 internal endTime;
    function startElection(uint256 weeks_, uint256 days_, uint256 hours_, uint256 minutes_, uint256 seconds_) external isHost {
        require(candidate.length >= 2, "At least 2 or more Candidates are required to start the Election!");

        endTime = block.timestamp + (weeks_ * 1 weeks) + (days_ * 1 days) + (hours_ * 1 hours) + (minutes_ * 1 minutes) + seconds_;
        emit setElection_time_(endTime);
    }
    event setElection_time_(uint256 indexed endTime_);
    
    function getElection_time() external view isElection returns(uint256) { return endTime - block.timestamp; }

    function resetElection() external isHost isElection {
        for(uint i=0; i<candidate.length; i++) 
            _candidate[candidateKeys[i]] = false;

        for(uint i=0; i<storageTAC.length; i++) {
            TAC__[tacKeys[i]] = false;
            voters[tacKeys[i]] = false;
        }
        
        delete candidate;
        delete storageTAC;
        endTime = 0;
        electionReset++;
        emit resetElection_(electionReset);
    }
    event resetElection_(uint indexed resetCount);

    function getResetElection_count() view external returns(uint) { return electionReset; }
}

contract Candidate is Election {
    function addCandidate(string memory name_, uint id_) external isHost {
        require(!_candidate[id_], "Candidate Existed!");
        require(block.timestamp > endTime, "Adding candidate is prohibited when election has started.");

        candidate.push(
            Candidate_({
                name: name_,
                id: id_,
                voteCount: 0
            }));
        
        _candidate[id_] = true;
        candidateKeys.push(id_);
    }

    function removeCandidate(uint id_) external isHost {
        require(_candidate[id_], "Candidate ID not found!");
        require(block.timestamp > endTime, "Removing candidate is prohibited when election has started.");

        uint i=0;
        for(i=0; i<candidate.length; i++)
            if(candidate[i].id == id_) {
                _candidate[id_] = false;
                candidate[i] = candidate[candidate.length - 1];
                candidate.pop();
            }
    }

    function getCandidates_votecount(uint id) view public returns(uint) {
        bool found = false;
        uint i;
        for(i=0; i<candidate.length; i++)
            if(candidate[i].id == id) {
                found = true;
                break;
            }
        require(found == true, "Invalid Candidate ID!");
        return candidate[i].voteCount;
    }
    
    function getCandidates() view public returns(Candidate_[] memory) { return candidate; }
}

contract Voter is Candidate {
    uint256 private TAC;

    function setTAC(uint[] memory TAC_) public isHost {
        for(uint8 i=0; i<TAC_.length; i++) {
            storageTAC.push(TAC_[i]);
            TAC__[TAC_[i]] = true;
            tacKeys.push(TAC_[i]);
        }
    }

    function updateTAC(uint256 TAC_) public { TAC = TAC_; }

    function getTAC() view public returns(uint256[] memory) { return storageTAC; }

    function verifyTAC() public view returns(bool) {
        for(uint8 i=0; i<storageTAC.length; i++)
            if(storageTAC[i] == TAC) return true;
        return false;
    }

    function vote(uint8 index) public isElection {
        // require(verifyTAC(), "Invalid TAC!");
        // require(index > 0 && index <= candidate.length, "Invalid Candidate Index!");
        require(!voters[TAC], "You have already voted!");

        // update voteCount and event
        candidate[index - 1].voteCount++;
        emit vote_(candidate[index - 1].name, candidate[index - 1].voteCount);

        // update voter's status
        voters[TAC] = true;
    }
    event vote_(string indexed name, uint indexed voteCount);

    function removeTAC(uint TAC_) external isHost {
        require(TAC__[TAC_], "TAC not found!");

        uint i;
        for(i=0; i<storageTAC.length; i++)
            if(storageTAC[i] == TAC_) {
                TAC__[TAC_] = false;
                voters[TAC_] = false;
                storageTAC[i] = storageTAC[storageTAC.length - 1];
                storageTAC.pop();
            }
    }
    function clearTAC() external isHost { 
        for(uint i=0; i<storageTAC.length; i++) {
            TAC__[tacKeys[i]] = false;
            voters[tacKeys[i]] = false;
        }
        delete storageTAC;
    }
}