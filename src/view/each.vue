<style scoped>
/*	.bigboss{
		height: 100%;
	}
	.bigbox{
		height: 900px;
	}*/
	.bigpic{
		position: relative;
		width: 100%;
		height: 900px;
		overflow: hidden;
	}
	img{
		position: absolute;
		width: 100%;
	}
	.user{
		position: relative;
		width: 100%;
		height: 120px;
	}
	.userpic{
		position: absolute;
		width: 10%;
		border-radius: 50%;
		margin: 40px 0 0 30px;
	}
	.username{
		position: absolute;
		top:56px;
		left:120px;
		font-size: 28px;
		color:#666;
	}
	.userfans{
		height: 100px;
		position: absolute;
		right: 30px;
		top:56px;
		color:#666;
		font-size:14px;
	}
	.fans{
		float: right;
		margin-left: 10px;
		margin-top: -15px;
		font-size: 40px;
		color:rgb(126,157,198);
	}
	.audio-fake{
		position: relative;
		top:600px;
		width: 100%;
		height: 150px;
		background: rgba(0,0,0,0.4);
	}
	.eachname{
		color:#fff;
		font-size: 14px;
	}
	.eachuser{
	  	color:#fff;
	  	font-size: 14px;
  	}
  	.eachusername,.eachchannel{
  		color:#b6d0f2;
  	}
  .outer-slider{
    position: absolute;
    width: 70%;
    top: 30px;
    left: 80px;
  }
  span.durtime{
      position: absolute;
      right:-120px;
      top: -10px;
      font-size: 13px;
      color:#fff;
    }
  .outer{
    width: 100%;
    height: 15px;
    background: rgba(0,0,0,0.2);
  }
  .slider{
    position: absolute;
    width: 0%;
    height: 15px;
    background: rgba(126,157,198,0.8);
    top:0px;
  }
  .pause{
    position: absolute;
    width: 70px;
    height: 70px;
    top: 0px;
    background-image: url(../../static/pause.svg);
  }
  .play{
    position: absolute;
    width: 70px;
    height: 70px;
    top: 0px;
    background-image: url(../../static/play.svg);
  }
  .song{
  	padding: 0 20px;
  }
</style>
<template>
	<div class="bigboss">
		<div class="bigbox">
			<div class="bigpic">
				<div class="user">
					<img :src="eachuserurl" class="userpic">
					<span class="username">{{eachusername}}</span>
					<p class="userfans">粉丝<span class="fans">{{eachuserfans}}</span></p>
				</div>
				<img :src="eachpicurl">
				<audio ref="audio" autoplay loop :src="eachsource"></audio>
				<div class="audio-fake">
						<div class="outer-slider" @touchstart="click_progress($event)">
							<div class="outer"></div>
							<span class="durtime">{{currenttime}}/{{durationtime}}</span>
							<div class="slider" ref="progress"></div>
							<span class="eachname">{{eachname}}</span><br/>
							<span class="eachuser"><span class="eachusername">{{eachusername}}</span>发布在<span class="eachchannel">{{eachchannel}}</span>频道</span>
						</div>
					<span :class="pause_play?'pause':''" @click="pause()"></span>
					<span :class="pause_play?'':'play'" @click="play()"></span>
				</div>
			</div>
			<div>
					<!-- {{eachlyric}} -->
			</div>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return {
			soundpic:this.$store.state.soundpic,
			showid:this.$store.state.showid,
			all:this.$store.state.all,
			eachname:"",
			eachpicurl:"",
			eachsource:"",
			eachuserurl:"",
			eachusername:"",
			eachuserfans:"",
			eachchannel:"",
			eachlyric:"",
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
		eachpic(){
	      return this.soundpic.filter((item)=>{
	          if(item.id == this.showid){
	          	//坑！这个值得要先去data一遍，才能用，不能直接把item赋值，在{{}}里打点调用，虽然会显示，但是会报错，是因为{{}}的值都必须是data
	          	this.eachname = item.sound.name;
	          	this.eachpicurl = item.sound.pic;
	          	this.eachsource = item.sound.source;
	          	this.eachchannel = item.sound.channel;
	          	this.eachuserurl = item.user.avatar;
	          	this.eachuserfans = item.user.fans;
	          	this.eachusername = item.user.name;
	          	var lyric = item.song_info.lyric;
	          	// console.log(this.eachlyric)
	          	// console.log(item.user)
	          }
	      })
	    },
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
				// console.log(self.$refs.progress.style.width)
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
			// console.log(click_position)
			// this.$refs.progress.style.width = a + "px"
			// console.log(click_position,progress_width)
			// this.$refs.audio.addEventListener("timeupdate",function(){
			// 	this.currentTime = time_sec
			// })
		}
	},
	mounted(){
		this.eachpic();
		this.duration_time();
    	this.current_time();     
	}
}
</script>