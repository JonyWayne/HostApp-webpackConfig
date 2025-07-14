import { lazy, Suspense, useState } from "react";
import { ToggleTheme } from "./ContextAPI/ToggleTheme";

export const App = () => {
  const RemoteApp = lazy(async () => {
    try {
      const module = await import("remoteApp/App");
      return {
        default: (props) => (
          <module.default
            data={sharedData}
            onDataUpdate={setSharedData}
            {...props}
          />
        ),
      };
    } catch (error) {
      console.error("Remote App failed to load:", error);
      return {
        default: () => (
          <div style={{ color: "red" }}>Remote component not available</div>
        ),
      };
    }
  });

  const [sharedData, setSharedData] = useState("Hello from host!");

  return (
    <div>
      <h1>Hello Im a HOST APP in React (Master)</h1>
      <h2 className="h2">
        Changed style when using toggle (changing theme in HOST)
      </h2>
      <p>{sharedData}</p>
      <Suspense fallback={<div>Loading...</div>}>
        <ToggleTheme />
        <RemoteApp
          data={sharedData}
          onDataUpdate={(newData: string) => setSharedData(newData)}
        />
      </Suspense>
    </div>
  );
};
