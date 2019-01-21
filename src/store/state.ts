

export class State {
    session? = {};
    profile = {
        fullName: '',
        friends: [],
    };
}

export const state = new State();

export default state;
