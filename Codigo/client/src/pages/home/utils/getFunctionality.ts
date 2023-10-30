export const getFunctionality = () => {
    const func = window.localStorage.getItem("lastFunctionality");

    return func;
}