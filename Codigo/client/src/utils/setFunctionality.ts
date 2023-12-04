export const setFunctionality = (func: string) => {
    window.localStorage.setItem("lastFunctionality", func);
}