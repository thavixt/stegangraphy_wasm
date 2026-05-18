import { useState } from "react";

interface AuthFlowResponse<T = string> {
  response: T;
}

interface UserDetails {
  id: string;
  name: string;
  displayName: string;
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);

  const greet = async (name: string) => {
    const params = ["welcome", `name=${name}`].join("&");
    const url = `${SERVER_URL}/?${params}`;
    const res = await fetch(url);
    const json = (await res.json()) as AuthFlowResponse;
    return json.response;
  };

  const fetchArgs = async (userDetails: UserDetails) => {
    console.log("fetchArgs", userDetails);
    const { displayName, id, name } = userDetails;
    const params = [
      `userId=${id}`,
      `userName=${name}`,
      `userDisplayName=${displayName}`,
    ].join("&");
    const url = `${SERVER_URL}/?fetchArgs&${params}`;
    const res = await fetch(url);
    const json = (await res.json()) as AuthFlowResponse<{
      publicKey: PublicKeyCredentialCreationOptionsJSON;
    }>;
    console.log("fetchArgs", json.response);
    return json.response.publicKey;
  };

  const createCredentials = async (
    args: PublicKeyCredentialCreationOptionsJSON,
  ) => {
    console.log("createCredentials", args);
    const parsedOptions =
      PublicKeyCredential.parseCreationOptionsFromJSON(args);
    const credential = await navigator.credentials.create({
      publicKey: parsedOptions,
    });
    if (!credential) {
      throw new Error("Failed creating credential");
    }
    console.log("createCredentials", credential);
    return credential;
  };

  // TODO
  const processCredentials = async () => {
    const clientDataJSON = "";
    const attestationObject = "";
    const challenge = "";
    const params = [
      `clientDataJSON=${clientDataJSON}`,
      `attestationObject=${attestationObject}`,
      `challenge=${challenge}`,
    ].join("&");
    const url = `${SERVER_URL}/?processArgs&${params}`;
    const res = await fetch(url);
    const json = (await res.json()) as AuthFlowResponse;
    setAuthenticated(true);
    return JSON.stringify(json, null, "  ");
  };

  return {
    enabled: !!SERVER_URL,
    authenticated,
    greet,
    register: async (details: UserDetails) => {
      const args = await fetchArgs(details);
      const creds = await createCredentials(args);
      console.log(creds);
    },
    login: async () => {
      // TODO
      const loginCreds = processCredentials();
      console.log(loginCreds);
    },
  };
}
