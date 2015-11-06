// This came from:
// https://github.com/mjw56/ruscello/blob/master/typings/react-redux/react-redux.d.ts

declare module "react-redux" {
    import React = require("react");
    import redux = require("redux");

    interface ProviderProps {
        store: redux.Store;
        children?: Function;
        key?: string;
    }

    interface ProviderState {
        store: redux.Store;
    }

    class Provider extends React.Component<ProviderProps, ProviderState> {
      render(): any;
    }

    interface ConnectorProps {
        children: Function;
        select: Function;
    }

    class Connector extends React.Component<ConnectorProps, any> {}

    function connect(...args: any[]): Function;
}
