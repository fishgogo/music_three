<style scoped>
/*  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }*/
  .audio-fake{
    position: relative;
    width: 100%;
    height: 120px;
    background: rgba(0,0,0,0.2);
  }
  .outer-slider{
    position: absolute;
    width: 70%;
    bottom: 34px;
    left: 80px;
  }
  span.durtime{
      position: absolute;
      right:-120px;
      bottom: -5px;
      font-size: 13px;
    }
  .outer{
    width: 100%;
    height: 15px;
    background: rgba(0,0,0,0.2);
  }
  .slider{
    position: absolute;
    width: 60%;
    height: 15px;
    background: rgba(126,157,198,0.8);
    top:0px;
  }
  .pause{
    position: absolute;
    width: 70px;
    height: 70px;
    bottom: 12px;
    background-image: url(../../static/pause.svg);
  }
  .play{
    position: absolute;
    width: 70px;
    height: 70px;
    bottom: 12px;
    background-image: url(../../static/play.svg);
  }
</style>
<template>
  <div id="app">
    <div class="box">
        <audio ref="audio" autoplay loop src="https://al-qn-echo-cp-cdn.app-echo.com/c2/4a86e987667a05e7f11615b49d8f88d421badee2ce8b71102c5204f106eecd231b4e36c3.mp3?1448676158"></audio>
        <div class="audio-fake">
          <div class="outer-slider" @touchstart="click_progress($event)">
            <div class="outer"></div>
            <span class="durtime">{{currenttime}}/{{durationtime}}</span>
            <div class="slider" ref="progress"></div>
          </div>
          <span :class="pause_play?'pause':''" @click="pause()"></span>
          <span :class="pause_play?'':'play'" @click="play()"></span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'App',
  data(){
    return{
      //播放器图标显示的值
      pause_play:true,
      //当前播放时间
      currenttime:0,
      //当前音乐时长
      durationtime:0,
      //当前播放时间
      currentsec:0,
      //当前音乐时长(秒)
      durantionsec:0,
      //进度条长度
      progresslength:0
    }
  },
  methods:{
    pause(){
      this.$refs.audio.pause();
      this.pause_play = false;
    },
    play(){
      this.$refs.audio.play();
      this.pause_play = true;
    },
    duration_time(){
      //储存self值，在下面function里面用
      var self = this;
      this.$refs.audio.addEventListener("canplay",function(){
        //当前音乐时长（秒）赋值
        self.durantionsec = this.duration;
        //把秒数转成mm：ss的形式
        var durtime = Math.floor(this.duration/60)+":"+(this.duration%60/100).toFixed(2).slice(-2);
        self.durationtime = durtime
      })
    },
    current_time(){
      //储存self值，在下面function里面用
      var self = this;
      this.$refs.audio.addEventListener("timeupdate",function(){
        //赋值当前时间的秒数
        self.currentsec = this.currentTime;
        //赋值当前进度条长度
        self.progresslength = (self.currentsec*(100/self.durantionsec));
        //动态改变进度条的宽度
          self.$refs.progress.style.width = self.progresslength +"%";      
        //把秒数转成mm：ss的形式
        var curtime = Math.floor(this.currentTime/60)+":"+(this.currentTime%60/100).toFixed(2).slice(-2);
        self.currenttime = curtime
      })
    },
    click_progress(event){                 
      var click_position = (event.touches[0].pageX);
      // console.log(this.$refs.progress.style.width)
      var progress_width = this.$refs.progress.style.width
      var play_speed = 100/this.durantionsec
      var time_sec = parseFloat(click_position) / play_speed
      var time_mmss = Math.floor(time_sec/60)+":"+(time_sec%60/100).toFixed(2).slice(-2)
      // console.log(time_mmss)
      console.log(click_position)
      // this.$refs.progress.style.width = a + "px"
      // console.log(click_position,progress_width)
    }
  },
  mounted(){
    this.duration_time();
    this.current_time();     
  },
  computed:{
    
  }
}
</script>


