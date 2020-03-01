const apiUrl = "http://127.0.0.1:5000/api";

export const login = async (username, password) => {
    const r = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        credentials: "include",
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

export const logout = async () => {
    const r = await fetch(`${apiUrl}/auth/logout`, {
        method: "GET",
        credentials: "include"
    });
    const json = await r.json();
    window.location.reload();
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
        credentials: "include",
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
        credentials: "include",
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

export const getPosts = async (setPosts, setDirty) => {
    const r = await fetch(`${apiUrl}/posts/get`, {
        method: "GET",
        credentials: "include"
    });
    const json = await r.json();
    setPosts(json);
    setDirty(false);
};

export const getCurrentUser = setProfile => {
    return fetch(`${apiUrl}/auth/currentuser`, {
        method: "GET",
        credentials: "include"
    }).then(r => {
        if (r.status == 200) {
            r.json().then(json => {
                console.log(json);
                setProfile(json);
                return true;
            });
        }
    });
};

export const getUser = async uid => {
    const r = await fetch(`${apiUrl}/auth/user/${uid}`, {
        method: "GET",
        credentials: "include"
    });
    const json = await r.json();
    return json;
};

export const addLike = async (postUid, setDirty) => {
    const r = await fetch(`${apiUrl}/posts/like/${postUid}/add`, {
        method: "POST",
        credentials: "include"
    });
    if (r.status == 200) {
        setDirty(true);
    } else {
        return;
    }
};

export const removeLike = async (postUid, setDirty) => {
    const r = await fetch(`${apiUrl}/posts/like/${postUid}/remove`, {
        method: "DELETE",
        credentials: "include"
    });
    if (r.status == 200) {
        setDirty(true);
    } else {
        return;
    }
};
