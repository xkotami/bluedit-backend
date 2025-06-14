"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const community_1 = require("../model/community");
const getAllCommunities = () => __awaiter(void 0, void 0, void 0, function* () {
    const communities = yield database_1.default.community.findMany({
        include: {
            posts: {
                include: {
                    comments: {
                        include: {
                            createdBy: true,
                            parent: {
                                include: {
                                    createdBy: true
                                }
                            },
                            replies: {
                                include: {
                                    createdBy: true
                                }
                            }
                        }
                    },
                    user: true,
                    community: true
                }
            },
            users: true
        }
    });
    return communities.map(community => community_1.Community.from(community));
});
const createCommunity = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const community = yield database_1.default.community.create({
            data: {
                name: input.name,
                description: input.description,
            },
            include: {
                posts: {
                    include: {
                        comments: {
                            include: {
                                createdBy: true,
                                parent: {
                                    include: {
                                        createdBy: true
                                    }
                                },
                                replies: {
                                    include: {
                                        createdBy: true
                                    }
                                }
                            }
                        },
                        user: true,
                        community: true
                    }
                },
                users: true
            }
        });
        return community_1.Community.from(community);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const findCommunityById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const community = yield database_1.default.community.findUnique({
            where: {
                id: id
            },
            include: {
                posts: {
                    include: {
                        comments: {
                            include: {
                                createdBy: true,
                                parent: {
                                    include: {
                                        createdBy: true
                                    }
                                },
                                replies: {
                                    include: {
                                        createdBy: true
                                    }
                                }
                            }
                        },
                        user: true,
                        community: true
                    }
                },
                users: true
            }
        });
        if (community) {
            return community_1.Community.from(community);
        }
        else {
            throw new Error("ERROR_COMMUNITY_NOT_FOUND");
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const getCommunitiesByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const communities = yield database_1.default.community.findMany({
            where: {
                users: {
                    some: {
                        id: id
                    }
                }
            },
            include: {
                posts: {
                    include: {
                        comments: {
                            include: {
                                createdBy: true,
                                parent: {
                                    include: {
                                        createdBy: true
                                    }
                                },
                                replies: {
                                    include: {
                                        createdBy: true
                                    }
                                }
                            }
                        },
                        user: true,
                        community: true
                    }
                },
                users: true
            }
        });
        return communities.map(community => community_1.Community.from(community));
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const joinCommunity = (userId, communityId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const community = yield database_1.default.community.update({
            where: {
                id: communityId
            },
            data: {
                users: {
                    connect: {
                        id: userId
                    }
                }
            },
            include: {
                posts: {
                    include: {
                        comments: {
                            include: {
                                createdBy: true,
                                parent: {
                                    include: {
                                        createdBy: true
                                    }
                                },
                                replies: {
                                    include: {
                                        createdBy: true
                                    }
                                }
                            }
                        },
                        user: true,
                        community: true
                    }
                },
                users: true
            }
        });
        return community_1.Community.from(community);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const getUserInCommunity = (userId, communityId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const community = yield database_1.default.community.findUnique({
            where: {
                id: communityId,
                users: {
                    some: {
                        id: userId
                    }
                }
            },
            include: {
                posts: {
                    include: {
                        comments: {
                            include: {
                                createdBy: true,
                                parent: {
                                    include: {
                                        createdBy: true
                                    }
                                },
                                replies: {
                                    include: {
                                        createdBy: true
                                    }
                                }
                            }
                        },
                        user: true,
                        community: true
                    }
                },
                users: true
            }
        });
        return community ? community_1.Community.from(community) : null;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const leaveCommunity = (userId, communityId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const community = yield database_1.default.community.update({
            where: {
                id: communityId
            },
            data: {
                users: {
                    disconnect: {
                        id: userId
                    }
                }
            },
            include: {
                posts: {
                    include: {
                        comments: {
                            include: {
                                createdBy: true,
                                parent: {
                                    include: {
                                        createdBy: true
                                    }
                                },
                                replies: {
                                    include: {
                                        createdBy: true
                                    }
                                }
                            }
                        },
                        user: true,
                        community: true
                    }
                },
                users: true
            }
        });
        return community_1.Community.from(community);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const findCommunityByPostId = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const community = yield database_1.default.community.findFirst({
            where: {
                posts: {
                    some: {
                        id: postId
                    }
                }
            },
            include: {
                posts: {
                    include: {
                        comments: {
                            include: {
                                createdBy: true,
                                parent: {
                                    include: {
                                        createdBy: true
                                    }
                                },
                                replies: {
                                    include: {
                                        createdBy: true
                                    }
                                }
                            }
                        },
                        user: true,
                        community: true
                    }
                },
                users: true
            }
        });
        if (community) {
            return community_1.Community.from(community);
        }
        else {
            throw new Error("ERROR_COMMUNITY_NOT_FOUND");
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.default = {
    getAllCommunities,
    createCommunity,
    findCommunityById,
    getCommunitiesByUserId,
    joinCommunity,
    getUserInCommunity,
    leaveCommunity,
    findCommunityByPostId,
};
