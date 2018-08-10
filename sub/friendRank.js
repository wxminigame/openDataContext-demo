import Graphic  from './canvas/graphic';
import Text     from './canvas/text';
import Bitmap   from './canvas/bitmap';
import ListView from './canvas/list';
import Box      from './canvas/box';

const sysInfo = wx.getSystemInfoSync();
GameGlobal.height = sysInfo.windowHeight;
GameGlobal.width = sysInfo.windowWidth;

export default class FriendRank {
    constructor(stage) {
        this.stage = stage;
        this.visible = true;
        this.getFriendData();
    }
    update() {

    }
    getFriendData() {
        if (!wx.getFriendCloudStorage) return [];
        wx.getFriendCloudStorage({
            keyList: ['score'],
            success: res => {
              console.log(JSON.stringify(res));
                if (!res.data.length) return;
                this.list = res.data;
                this.render();
            },
            fail: err => {

            }
        });
    }
    render() {
        if (!this.visible) return
        if (!this.list || !this.list.length) return;

        // 测试数据
        for (var i = 0; i < 10; i++) {
            this.list.push(this.list[0]);
        }

        let data = this.getSortedListData();

        this.renderBackground();
        this.renderList(data);
        this.renderTitle();
    }
    renderList(data){
        let box = new Box(300, 500);
        let _list = new ListView();
        _list.array = data;

        box.addChild(_list);
        this.stage.addChild(box);
    }
    getSortedListData(){
        let data = [];
        this.list.forEach((it, index) => {
            data.push({
                score: Math.floor(Math.random() * 1000),
                nick: it.nickname,
                src: it.avatarUrl
            });
        });

        data.sort((a, b) => {
            return b.score - a.score
        });

        data.forEach((it, index) => {
            it.rank = ++index
        });
        return data
    }
    renderTitle(){
        let title = new Text();
        title.pos(GameGlobal.width / 2, 50);
        title.valign    = 'middle';
        title.align     = 'center';
        title.fontSize  = 24;
        title.text      = '好友排行榜';
        title.color     = 'white';
        this.stage.addChild(title);
    }
    renderBackground() {
/*        let img = new Bitmap();
        img.width = this.stage.width;
        img.height = this.stage.height;
        img.pos(0, 0);
        img.src = 'images/sub/bg.png';
        this.stage.addChild(img);*/

        let background = new Graphic();
        background.drawRect(0, 0, this.stage.width, this.stage.height, 'rgba(0,0,0,0.6)');
        this.stage.addChild(background);
    }
}