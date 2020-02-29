const apiUrl = "http://127.0.0.1:5000/api";

export const login = async (username, password) => {
    const r = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: username,
            password: password
        })
    });
    const body = await r.json();
    return body;
};

export const register = async options => {
    /*
     * options values:
     * email -> required str
     * password -> required super secret str
     * name -> required str
     * description -> required str
     * location -> optional required str
     * is_organisation -> optional bool, defaults to false if not specified
     */
    let r = await fetch(`${apiUrl}/auth/validate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(options)
    });
    if (r.status == 400) {
        const errorJson = await r.json();
        return {
            error: true,
            errors: errorJson.errors
        };
    } else {
        r = await fetch(`${apiUrl}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(options)
        });
        if (r.status != 201) {
            return {
                error: true
            };
        } else {
            const json = await r.json();
            return json.data;
        }
    }
};

export const addPost = async options => {
    /*
     * options values
     * transloadit_id -> required str
     * name -> required str, used for categorising vault payments
     * text -> required str
     * animal_type -> str, currently required but we could make this default to other
     */
    const r = await fetch(`${apiUrl}/posts/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(options)
    });
    if (r.status == 200) {
        const json = await r.json();
        return json.data;
    } else {
        const json = await r.json();
        return {
            error: true,
            message: json.message
        };
    }
};

export const getPosts = async () => {
    const r = await fetch(`${apiUrl}/posts/`, {
        method: "GET"
    });
    const json = await r.json();
    return json;
};

const getCurrentUser = async () => {
    const r = await fetch(`${apiUrl}/auth/currentuser`, {
        method: "GET"
    });
    const json = await r.json();
    return json;
};

const getUser = async uid => {
    const r = await fetch(`${apiUrl}/auth/user/${uid}`, {
        method: "GET"
    });
    const json = await r.json();
    return json;
};
