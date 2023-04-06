## React Questions

-  What is the difference between Component and PureComponent? give anexample where it might break my app.  
  ```
Component and PureComponent are both React classes that can be used to create components. The main difference between them is how they handle re-rendering. PureComponent automatically implements a shouldComponentUpdate() method that does a shallow comparison of the component's props and state. If there are no changes, the component does not re-render. Component, on the other hand, does not implement this method and will always re-render when any props or state changes.

E.g, if you have a large list of items that is frequently updated, using a regular Component to render each item could be inefficient because it will re-render each item every time any other item is updated. In this case, using a PureComponent could improve performance by only re-rendering the items that have actually changed.
```

- Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
```
Context is a way to pass data down the component tree without having to pass props through every level. But, combining Context with ShouldComponentUpdate can be risky because it can cause unpredictable behavior. ShouldComponentUpdate is used to decide whether a component should re-render, and using it with Context can cause components to not re-render when they should, or re-render when they shouldn't. This can lead to outdated data being displayed or unnecessary re-renders.
```

- Describe 3 ways to pass information from a component to its PARENT.
```
Pass a function as a prop from the parent to the child, which the child can call to pass data back up to the parent.

Use React's Context API to pass data down the component tree to child components.

Use a third-party state management library like Redux/Jotai to manage state across multiple components.
```
- Give 2 ways to prevent components from re-rendering.
```
UUse the useMemo hook: useMemo is a hook that helps to memoize expensive computations. It takes two arguments, the first one is a function that performs the computation, and the second one is an array of dependencies. If any of the dependencies change, the function will be re-executed. If not, the memoized value is returned. 

Use the React.memo higher-order component: React.memo is a higher-order component that can be used to memoize a component. When a component wrapped in React.memo is re-rendered, React will compare the new props with the previous props. If the props have not changed, the component will not re-render.
```
- What is a fragment and why do we need it? Give an example where it might break my app.

```
A fragment is a way to group multiple React components together without having to use a wrapper element. This is useful when you need to render a list of items without adding an extra element around each item.

E.g, if you have a list of table rows that need to be rendered, using a fragment to group them could be helpful because it will not add an extra element around each row. 
```
- Give 3 examples of the HOC pattern.

```
WithRouter: A higher order component provided by React Router that adds router-related props (like match, location, and history) to a component.

Connect: A higher order component provided by Redux that connects a component to the store and provides access to state and actions.

Memoize: A higher order function that takes a function as an argument and returns a new function that caches the result of the original function and returns the cached result if the arguments are the same.
```
-  What's the difference in handling exceptions in promises, callbacks and
async...await.
```
Promises, callbacks, and async/await all handle exceptions differently. Promises use .catch() to handle exceptions, callbacks use try/catch blocks to handle exceptions, and async/await uses try/catch blocks as well.
```
- How many arguments does setState take and why is it async?
```
SetState takes two arguments: the first argument is an object representing the new state you want to set, and the second argument is an optional callback function that will be called after the state has been updated. The reason setState is async is because React batches state updates together for performance reasons.
```

- List the steps needed to migrate a Class to Function Component.
```
Remove the render() method and return JSX directly from the function.
Replace this.props with the function's parameter.
Replace this.state with useState() hook. "If there are multiple state variables, use multiple useState() hooks"
Replace lifecycle methods with useEffect() hook.
Replace instance variables with useRef() hook.
Replace this.setState() with state update functions returned by useState() hook.
```
-  List a few ways styles can be used with components.
There are several ways to use styles with components in React:
```

Inline styles: You can pass a JavaScript object with CSS styles as the style prop to a component. For example: <div style={{ color: 'red', fontSize: '16px' }}>Hello World</div>.

CSS Modules: This is a feature of many build tools, such as Webpack, that allows you to import a CSS file as a module and reference class names from it in your JSX. For example: import styles from './MyComponent.module.css'; and then <div className={styles.myClass}>Hello World</div>.

CSS-in-JS: There are several libraries that allow you to write CSS styles in JavaScript and inject them into your components. Examples include styled-components and emotion.
```
 How to render an HTML string coming from the server?
 ```
 To render an HTML string coming from the server, you can use the dangerouslySetInnerHTML prop in React. This prop takes an object with a __html property that contains the HTML string you want to render.
 ```
