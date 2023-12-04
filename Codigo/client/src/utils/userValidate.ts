export const userValidate = async () => {

    const token = window.localStorage.getItem("authorization");

    if(!token){
        return false;
    }

    const response = await fetch("/user/validate");

    if(!response.ok){
        window.localStorage.removeItem("authorization");
        return false;
    }

    return true;

}