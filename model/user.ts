export class User {
    id: number;
    username: string;
    password: string;
    profile_pic: string;
    email: string;
    reputation: number;

    constructor(user: {
        id: number;
        username: string;
        password: string;
        profile_pic: string;
        email: string;
        reputation: number;
    }) {
        this.validate(user);

        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.profile_pic = user.profile_pic;
        this.email = user.email;
        this.reputation = user.reputation;
    }

    getId(): number {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

    getProfilePic(): string {
        return this.profile_pic;
    }

    getEmail(): string {
        return this.email;
    }

    getReputation(): number {
        return this.reputation;
    }

    setUsername(username: string) {
        this.username = username;
    }

    setPassword(password: string) {
        this.password = password;
    }

    setProfilePic(profile_pic: string) {
        this.profile_pic = profile_pic;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setReputation(reputation: number) {
        this.reputation = reputation;
    }

    validate(user: {
        id: number;
        username: string;
        password: string;
        profile_pic: string;
        email: string;
        reputation: number;
    }) {
        if (!user.username?.trim()) {
            throw new Error('Username is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (!user.profile_pic?.trim()) {
            throw new Error('Profile picture is required');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }
        if (isNaN(user.reputation)) {
            throw new Error('Reputation must be a valid number');
        }
    }

    equals(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.password === user.getPassword() &&
            this.profile_pic === user.getProfilePic() &&
            this.email === user.getEmail() &&
            this.reputation === user.getReputation()
        );
    }
}
