<style scoped>
.big_boss {
  position: relative;
  width: 100%;
}
img {
  width: 100%;
}
img.banner {
  border: 20px solid #e8e8e8;
  box-sizing: border-box;
}
.recommend_day {
  margin: 40px auto;
  width: 200px;
  height: 50px;
  background: rgb(203, 233, 225);
  text-align: center;
  line-height: 50px;
  color: rgb(72, 174, 167);
  font-size: 26px;
  border-radius: 25px;
}
.recommend_day_list {
  margin-top: 50px;
  list-style: none;
  padding: 10px;
  padding-top: 40px;
  /* margin:  0 auto; */
}
.recommend_day_list li {
  float: left;
  width: 49%;
  height: 460px;
  /* margin-left: 25px; */
}
.recommend_day_list li img {
  width: 100%;
  height: 350px;
}
.recommend_day_list li:nth-child(2n) {
  margin-left: 2%;
}
.itemname{
  width: 330px;
  font-size: 26px;
  font-weight: bold;
  color:#666666;
  overflow: hidden; /*自动隐藏文字*/
  white-space: nowrap;/*强制不换行*/
  text-overflow: ellipsis;/*文字隐藏后添加省略号*/
  padding-top: 5px;
}
.itemchannel{
  margin-top: 15px;
  font-size: 24px;
  color:rgb(72, 174, 167);
}
.itemchannel span{
  float: right;
  margin-right: 20px;
  color:#999999;
}
</style>
<template>
    <div class="big_boss">
        <div class="banner">
            <img :src="bannerimg" class="banner">
        </div>
        <div class="recommend_day">每日推荐</div>
        <ul class="recommend_day_list">
          <li  v-for="(item,index) in soundpic" :key="index" @click="showId(item.id);goeach()">
            <img :src="item.sound.pic">
            <p class="itemname">{{item.sound.name}}</p>
            <p class="itemchannel">{{item.sound.channel}}<span>频道</span></p>
          </li>
        </ul>
        <div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      bannerimg: "",
      soundpic: [],
      showid:this.$store.state.showid
    }
  },
  methods:{
    showId(index){
        this.$store.dispatch("SHOWID",index)
    },
    goeach(){
      this.$router.push({"path":"/each"})
    }
  },
  mounted() {
    this.axios.get("./static/data1.json").then((data) => {
      this.bannerimg = data.data.banner.sound.pic_big
      // console.log(data.data.banner.sound)
    });
    this.axios.get("./static/data1.json").then((data) => {
      var pic = data.data.recommend_day
      this.soundpic = data.data.recommend_day
      this.$store.dispatch("GETSOUNDPIC",pic)
      // console.log(this.soundpic)
    });
    this.axios.get("./static/data1.json").then((data) => {
      var all = data.data
      this.$store.dispatch("GETALL",all)
    });
  }
}
</script>