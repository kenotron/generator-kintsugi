/// <reference path='../react/react.d.ts' />

declare module 'react-pure-render/function' {
	function shouldPureComponentUpdate(nextProps: any, nextState: any, nextContext: any): boolean;
	export = shouldPureComponentUpdate; 
}

declare module 'react-pure-render/component' {
	class PureComponent<P, S> extends __React.Component<P, S> {}
	
}

declare module 'react-pure-render' {
	export function shallowEqual(objA: any, objB: any): boolean; 
}