class FriendsList {
  private friends = [];

  addFriend(name: string) {
    this.friends.push(name);
    this.annouseFriend(name);
  }

  getFriends() {
    return this.friends;
  }

  annouseFriend(name: string) {
    global.console.log(`${name} has been added to the list`);
  }
}

describe('Friends List', () => {
  let friendsList;
  beforeEach(() => {
    friendsList = new FriendsList();
  });
  it('should be empty list', () => {
    const friends = friendsList.getFriends();
    expect(friends.length).toBe(0);
  });
  it('add friend to the list', () => {
    friendsList.addFriend('chandra');
    const friends = friendsList.getFriends();
    expect(friends.length).toBe(1);
  });
  it('annouse friend', () => {
    friendsList.annouseFriend = jest.fn();
    friendsList.addFriend('chandra');
    expect(friendsList.annouseFriend).toHaveBeenCalledTimes(1);
  });
});
