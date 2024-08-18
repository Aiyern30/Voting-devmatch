// types.ts (create a new file for types)
export interface Owner {
  _id: string; // MongoDB Object ID
  id: string; // Owner ID (adjust this if necessary)
  owneremail: string; // Owner's email
  ownerpassword: string; // Owner's password (consider security implications)
  status: string; // Owner's status
}

export interface Candidate {
  candidateid: string; // Match the exact property name
  candidatename: string; // Match the exact property name
  candidategender: string; // Match the exact property name
  candidateposition: string; // Match the exact property name
  candidateemail: string; // Match the exact property name
  // candidatepicture: string;
}

export interface voter {
  index: number; // Match the exact property name
  votertac: string; // Match the exact property name
  voteremail: string; // Match the exact property name
  status: string; // Match the exact property name
  votecount: number; // Match the exact property name
}
