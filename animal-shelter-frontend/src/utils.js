const apiUrl = "http://127.0.0.1:5000/api";
export const login = async (username, password) => {
    const r = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            username: username,
            password: password
        }
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
        body: options
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
            body: options
        });
        if (r.status != 200) {
            return {
                error: true
            };
        } else {
            const json = await r.json();
            return {
                error: false,
                data: json.data
            };
        }
    }
};
