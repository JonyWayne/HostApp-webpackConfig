declare module "remoteApp/App" {
  import { RemoteAppProps } from "remoteApp/types";
  const RemoteComponent: React.ComponentType<RemoteAppProps>;
  export default RemoteComponent;
}
