"use client";
import dvs_artifact from "@/DVS/artifacts/contracts/DVS.sol/Voter.json";

import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Header from "@/components/ui/Components/Header";
import { Input } from "@/components/ui/Input";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthContext";
import Footer from "@/components/ui/Components/Footer";
import { ethers } from "ethers";

const Page: React.FC = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  console.log("Password", password);
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const [isRequestingAccounts, setIsRequestingAccounts] =
    useState<boolean>(false);

  const [abi, setABI] = useState(null);
  const [bytecode, setBytecode] = useState(null);
  const [deployedAddress, setDeployedAddress] = useState("");
  const [contractReader, setContractReader] = useState(null);
  const [contractWriter, setContractWriter] = useState(null);

  //generate TAC
  const [isPasscodeRequested, setIsPasscodeRequested] =
    useState<boolean>(false);
  const [generatedTAC, setGeneratedTAC] = useState<number>(0);
  const [tacRequested, setTacRequested] = useState<boolean>(false);
  const deployContract = async () => {
    if (!window.ethereum) {
      console.error("Ethereum provider not found.");
      return null;
    }

    if (isRequestingAccounts) {
      console.warn("Already requesting accounts. Please wait.");
      return null;
    }

    setIsRequestingAccounts(true);
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractFactory = new ethers.ContractFactory(
        dvs_artifact.abi,
        dvs_artifact.bytecode,
        signer
      );

      const contractDeploy = await contractFactory.deploy();
      await contractDeploy.deployed();

      const deployedAddress = contractDeploy.address;
      localStorage.setItem("deployed_address", deployedAddress);

      console.log("Contract deployed to address:", deployedAddress);
      return deployedAddress;
    } catch (error) {
      console.error("Error deploying contract:", error);
      return null;
    } finally {
      setIsRequestingAccounts(false);
    }
  };

  const handleHostLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoginSuccess(null);
    setLoginError(null);

    try {
      let address: string | null = null;
      try {
        // Attempt to deploy the contract
        address = await deployContract();
      } catch (deployError) {
        // If deployment fails due to MetaMask rejection, handle it
        if (
          deployError instanceof Error &&
          deployError.message.includes(
            "MetaMask Tx Signature: User denied transaction signature"
          )
        ) {
          // Log the rejection and continue
          console.warn(
            "User denied the MetaMask transaction. Proceeding with login."
          );
        } else {
          // Handle other deployment errors
          throw deployError;
        }
      }

      if (!address) {
        // If address is still null, show a warning but proceed with login
        setLoginError(
          "Contract deployment was skipped. Proceeding with login."
        );
      }

      // Proceed with the login after handling the deployment
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);

        setLoginSuccess("Login successful! Redirecting...");
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");

        setTimeout(() => {
          router.push("/Login/OwnerHomepage");
        }, 3000);
      } else {
        const data = await response.json();
        setLoginError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during deployment or login:", error);

      if (
        error instanceof Error &&
        error.message.includes(
          "MetaMask Tx Signature: User denied transaction signature"
        )
      ) {
        // Handle MetaMask rejection specifically
        setLoginSuccess("Transaction rejected. Proceeding with login.");
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");

        setTimeout(() => {
          router.push("/Login/OwnerHomepage");
        }, 3000);
      } else {
        setLoginError("An error occurred. Please try again.");
      }
    } finally {
      setEmail("");
      setPassword("");

      setTimeout(() => {
        setLoginError(null);
        setLoginSuccess(null);
      }, 3000);
    }
  };

  const handleVoterLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/voterLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data.message);
        setLoginSuccess(data.message);
        setIsLoggedIn(true); // Update login state if necessary

        // Show success message and redirect after 3 seconds
        setTimeout(() => {
          router.push("/Login/VoterHomepage/VotingPage"); // Redirect to VoterHomePage
        }, 3000);
      } else {
        const data = await response.json();
        setLoginError(data.message);
        setTimeout(() => {
          setLoginError(null);
        }, 3000);
      }
    } catch (error) {
      setLoginError("An error occurred. Please try again.");
      setTimeout(() => {
        setLoginError(null);
      }, 3000);
    }
  };

  // const handleEmailReq = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     // generate TAC and show in page here
  //     const newTAC = Math.floor(Math.random() * 900000) + 100000;
  //     setGeneratedTAC(newTAC);
  //     setTacRequested(true);
  //     // console.log(`Generated TAC: ${newTAC}`); // Debugging
  //     // console.log(`type of newTAC: ${typeof newTAC}`);
  //     const response = await fetch("/api/requestPasscode", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, newTAC }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       if (data.message.includes("pending")) {
  //         setLoginError(data.message);
  //         setTimeout(() => {
  //           setLoginError(null);
  //         }, 3000);
  //       } else if (data.message.includes("successful")) {
  //         setIsPasscodeRequested(true); // Allow passcode input to be editable
  //         setLoginSuccess(data.message);
  //         setTimeout(() => {
  //           setLoginSuccess(null);
  //         }, 3000);
  //       }
  //     } else {
  //       const data = await response.json();
  //       setLoginError(data.message);
  //       setTimeout(() => {
  //         setLoginError(null);
  //       }, 3000);
  //     }
  //   } catch (error) {
  //     setLoginError("An error occurred. Please try again.");
  //     setTimeout(() => {
  //       setLoginError(null);
  //     }, 3000);
  //   }
  // };

  const handleEmailReq = async (e: React.FormEvent) => {
    e.preventDefault();

    // Generate TAC
    const newTAC = Math.floor(Math.random() * 900000) + 100000;
    setGeneratedTAC(newTAC);
    setTacRequested(true);

    try {
      const response = await fetch("/api/requestPasscode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newTAC }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message.includes("pending")) {
          setLoginError(data.message);
          setTimeout(() => {
            setLoginError(null);
          }, 3000);
        } else if (data.message.includes("verified")) {
          setIsPasscodeRequested(true); // Allow passcode input to be editable
          setLoginSuccess(data.message);
          setTimeout(() => {
            setLoginSuccess(null);
          }, 3000);
        }
      } else {
        const data = await response.json();
        setLoginError(data.message);
        setTimeout(() => {
          setLoginError(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error in handleEmailReq:", error);
      setLoginError("An error occurred. Please try again.");
      setTimeout(() => {
        setLoginError(null);
      }, 3000);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerPassword !== confirmPassword) {
      setRegisterError("Passwords do not match.");
      setTimeout(() => {
        setRegisterError(null);
      }, 3000);
      return;
    }
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registerEmail, registerPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        setRegisterSuccess("Registration successful! You can now log in.");

        // Clear the input fields
        setRegisterEmail("");
        setRegisterPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          setRegisterSuccess(null);
          router.push("/Login"); // Redirect to login page after registration
        }, 3000);
      } else {
        const data = await response.json();
        setRegisterError(data.message);
        setTimeout(() => {
          setRegisterError(null);
        }, 3000);
      }
    } catch (error) {
      setRegisterError("An error occurred. Please try again.");
      setTimeout(() => {
        setRegisterError(null);
      }, 3000);
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center pt-10">
        <Tabs defaultValue="Voter" className="">
          <TabsList className=" w-[200px]">
            <TabsTrigger className="w-full" value="Voter">
              Voter
            </TabsTrigger>
            <TabsTrigger className="w-full" value="hostLogin">
              Host
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Voter" className="flex justify-center">
            <Card className="w-[600px] bg-[#987070] rounded-3xl">
              <CardHeader>
                <CardTitle className="text-white font-bold text-center">
                  Enter your email to request passcode
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-full pb-20">
                {loginError && (
                  <Alert className="mb-4 bg-red-200">
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>{loginError}</AlertDescription>
                  </Alert>
                )}
                {loginSuccess && (
                  <Alert className="mb-4 bg-green-200">
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>{loginSuccess}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleVoterLogin}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex space-y-1.5 relative w-full">
                      <Input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="pl-24 pr-[120px] rounded-xl py-9 bg-[#D9D9D9] text-black w-full overflow-auto"
                      />
                      <Image
                        src={"/gmail.png"}
                        alt={""}
                        width={45}
                        height={45}
                        className="absolute top-2 left-7"
                      />
                      <Button
                        onClick={handleEmailReq}
                        className="absolute right-2.5 top-2 bg-[#D9D9D9] text-black rounded-full hover:bg-white p-5"
                        disabled={isPasscodeRequested} // Disable if passcode is requested or pending
                      >
                        Request
                      </Button>
                    </div>
                    <div className="flex space-y-1.5 relative w-full">
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Passcode"
                        className={`pl-24 rounded-xl py-9 bg-[#D9D9D9] text-black w-full ${
                          !isPasscodeRequested
                            ? "cursor-not-allowed"
                            : "cursor-auto"
                        }`}
                        readOnly={!isPasscodeRequested}
                      />
                      <Image
                        src={"/lock.png"}
                        alt={""}
                        width={45}
                        height={45}
                        className="absolute top-2 left-7"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="mx-auto bg-[#D9D9D9] text-black rounded-full hover:bg-white p-5"
                      disabled={!isPasscodeRequested} // Disable login button if passcode not requested
                    >
                      Login
                    </Button>
                              
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* <TabsContent value="Register" className="flex justify-center">
            <Card className="w-[600px] bg-[#987070] rounded-3xl">
              <CardHeader>
                <CardTitle className="text-white font-bold text-center">
                  New Account
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-full pb-20">
                {registerError && (
                  <Alert className="mb-4 bg-red-200">
                    <AlertTitle>Oops!</AlertTitle>
                    <AlertDescription>{registerError}</AlertDescription>
                  </Alert>
                )}
                {registerSuccess && (
                  <Alert className="mb-4 bg-green-200">
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>{registerSuccess}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleRegister}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex space-y-1.5 relative w-full">
                      <Input
                        id="email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        placeholder="Email Address"
                        className="pl-24 rounded-xl py-9 bg-[#D9D9D9] text-black w-full"
                      />
                      <Image
                        src={"/gmail.png"}
                        alt={""}
                        width={45}
                        height={45}
                        className="absolute top-2 left-7"
                      />
                    </div>
                    <div className="flex space-y-1.5 relative w-full">
                      <Input
                        id="password"
                        type="password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        placeholder="Password"
                        className="pl-24 rounded-xl py-9 bg-[#D9D9D9] text-black w-full"
                      />
                      <Image
                        src={"/lock.png"}
                        alt={""}
                        width={45}
                        height={45}
                        className="absolute top-2 left-7"
                      />
                    </div>
                    <div className="flex space-y-1.5 relative w-full">
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="pl-24 rounded-xl py-9 bg-[#D9D9D9] text-black w-full"
                      />
                      <Image
                        src={"/lock.png"}
                        alt={""}
                        width={45}
                        height={45}
                        className="p-none absolute top-2 left-7"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="mx-auto bg-[#D9D9D9] text-black rounded-full hover:bg-white p-5"
                    >
                      Sign Up
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent> */}
          <TabsContent value="hostLogin" className="flex justify-center">
            <Card className="w-[600px] bg-[#987070] rounded-3xl">
              <CardHeader>
                <CardTitle className="text-white font-bold text-center">
                  Host login
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-full pb-20">
                {loginError && (
                  <Alert className="mb-4 bg-red-200">
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>{loginError}</AlertDescription>
                  </Alert>
                )}
                {loginSuccess && (
                  <Alert className="mb-4 bg-green-200">
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>{loginSuccess}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleHostLogin}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex space-y-1.5 relative w-full">
                      <Input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className=" pl-24 pr-[120px] rounded-xl py-9 bg-[#D9D9D9] text-black w-full overflow-auto"
                      />
                      <Image
                        src={"/gmail.png"}
                        alt={""}
                        width={45}
                        height={45}
                        className="absolute top-2 left-7"
                      />
                    </div>

                    <div className="flex space-y-1.5 relative w-full">
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="pl-24 rounded-xl py-9 bg-[#D9D9D9] text-black w-full"
                      />
                      <Image
                        src={"/lock.png"}
                        alt={""}
                        width={45}
                        height={45}
                        className="absolute top-2 left-7"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="mx-auto bg-[#D9D9D9] text-black rounded-full hover:bg-white p-5"
                    >
                      Login
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="bg-[#DBB5B5] h-16 mt-20"></div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
