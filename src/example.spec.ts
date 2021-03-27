class FriendsList {
  private friends: string[] = [];

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

  removeFriend(name: string) {
    const index = this.friends.findIndex((friend) => friend === name);
    if (index < 0) {
      throw new Error('Friend not found');
    }
    this.friends.splice(index, 1);
  }

  fetchFriends() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.friends);
      });
    });
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
    expect(friendsList.annouseFriend).not.toHaveBeenCalled();
    friendsList.addFriend('chandra');
    expect(friendsList.annouseFriend).toHaveBeenCalledTimes(1);
  });
  describe('remove friends', () => {
    it('remove friend when found', () => {
      friendsList.addFriend('chandra');
      expect(friendsList.getFriends().length).toBe(1);
      friendsList.removeFriend('chandra');
      expect(friendsList.getFriends().length).toBe(0);
    });
    it('remove friend when not found', () => {
      expect(friendsList.getFriends().length).toBe(0);
      expect(() => friendsList.removeFriend('chandra')).toThrow(new Error('Friend not found'));
    });
  });
  describe('fetch friends', () => {
    it('no friends', async () => {
      try {
        const friends = await friendsList.fetchFriends();
        await expect(friends.length).toBe(0);
      } catch (error) {
        expect(error).toMatch('Friend not found');
      }
    });
    it('no friends', async () => {
      friendsList.addFriend('chandra');
      try {
        const friends = await friendsList.fetchFriends();
        await expect(friends.length).toBe(1);
      } catch (error) {
        expect(error).toMatch('error');
      }
    });
  });
});
