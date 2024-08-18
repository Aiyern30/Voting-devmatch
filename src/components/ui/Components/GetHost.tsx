"use client";
import { useEffect, useState } from "react";

const GetHost = () => {
  const [host, setHost] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHost = async () => {
      try {
        const response = await fetch("/api/getHost");
        if (!response.ok) {
          throw new Error("Failed to fetch host");
        }
        const data = await response.json();
        setHost(data.host);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      }
    };

    fetchHost();
  }, []);

  return (
    <div>{error ? <p>Error: {error}</p> : <p>Election Host: {host}</p>}</div>
  );
};

export default GetHost;
