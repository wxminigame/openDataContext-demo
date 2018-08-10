import FriendRank   from './friendRank'
import GroupRank    from './groupRank'
import MiniCanvas   from './canvas/index';

const stage = new MiniCanvas(sharedCanvas);

export default class Main {
    constructor() {
        this.initMessage();
    }
    initMessage() {
        wx.onMessage(data => {
            switch (data.type) {
                case 'showFriendRank':
                    this.renderFriendRank();
                    break;
                case 'showGroupRank':
                    this.renderGroupRank(data.shareTickets);
                    break;
                case 'updateData':
                    break;
                case 'otherMessage':
                    break;
            }
        });
    }
    
    renderFriendRank() {
        this.hideGroupRank();
        this.friendRank = new FriendRank(stage);
    }
    hideFriendRank() {
      if (this.friendRank)
        this.friendRank.visible = false;
    }
    renderGroupRank(shareTicket) {
      this.hideFriendRank();
      this.groupRank = new GroupRank(stage, shareTicket);
    }
    hideGroupRank() {
      if (this.groupRank)
        this.groupRank.visible = false;
    }
}
new Main();

