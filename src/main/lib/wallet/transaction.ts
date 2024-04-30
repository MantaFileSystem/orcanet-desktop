import { net } from "electron";
import { portNumber } from "@shared/constants";
import { GetTransactions } from "@shared/types";
import { ITransaction } from "@shared/models";

export const getTransactions: GetTransactions = async () => {
  return new Promise<ITransaction[]>((resolve, reject) => {
    const request = net.request({
      method: "GET",
      protocol: "http:",
      hostname: "localhost",
      port: portNumber,
      path: "/get-peers",
      redirect: "follow",
    });

    let responseBody = "";

    request.on("response", (response) => {
      console.info(`STATUS: ${response.statusCode}`);
      console.info(`HEADERS: ${JSON.stringify(response.headers)}`);

      response.on("data", (chunk) => {
        responseBody += chunk;
      });

      response.on("end", () => {
        console.log("No more data in response.");
        console.log("res body", responseBody);
        try {
          const files = JSON.parse(responseBody);
          if (!Array.isArray(files)) {
            throw new TypeError("Received data is not an array");
          }
          const walleData = files.map((file) => ({
            id: file.id,
            amount: file.amount,
            status: file.status,
            reason: file.reason,
            date: new Date(file.date),
            From: file.From,
            To: file.To,
          }));
          resolve(walleData);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
      });
    });

    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
      reject(error);
    });

    request.on("close", () => {
      console.log("Last Transaction has occurred");
    });

    request.setHeader("Content-Type", "application/json");
    request.end();
  });
};
