
class Vars {

    constructor() {
    }
    // Getter
    getApi(){
        const api = `${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}`;
      return api
    }

}

export default new Vars()