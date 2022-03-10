<template>
  <div class="stage" @click="pop"></div>
</template>

<script>
import * as PIXI from "pixi.js";
import anime from "animejs";

export default {
  name: "HelloWorld",
  data() {
    return {
      app: null,
      colors: ["75F4F4", "90E0F3", "B8B3E9", "D999B9"],
      dustFrames: [
        "src/assets/light-green.png",
        "src/assets/light-pink.png",
        "src/assets/light-violet.png",
        "src/assets/light-yellow.png",
      ],
    };
  },
  mounted() {
    this.app = new PIXI.Application({
      //   transparent: true,
      antialias: true,
    });
    // this.$el.appendChild(this.app.view);
    const gameArea = document.querySelector(".stage");
    console.log("gameArea=====", gameArea);
    gameArea.appendChild(this.app.view);
    this.app.renderer.view.style.display = "block";
    this.app.renderer.autoResize = true;
    this.app.renderer.backgroundColor = 0x061639;
    // this.app.renderer.resize(window.innerWidth, window.innerHeight/2);
  },
  methods: {
    pop(event) {
      let mouse_x = event.x,
        mouse_y = event.y,
        particles = [],
        spread = 100;

      for (let i = 0; i < 25; i++) {
        let rand = anime.random(1, this.dustFrames.length);
        
        const textureName = this.dustFrames[rand - 1];
        let sprite = PIXI.Sprite.from(textureName);
        sprite.x = mouse_x;
        sprite.y = mouse_y;
        sprite.anchor.set(0.5, 0.5);
        this.app.stage.addChild(sprite);
        particles.push(sprite);
      }

      let angle = 45 * Math.PI / 180;
      anime({
        targets: particles,
        x() {
          const x = anime.random(mouse_x - spread, mouse_x);
          angle = anime.random(30, 45) * Math.PI / 180;
          console.log('anime====x', angle)
           
          return x * Math.cos(angle);
        },
        y() {
          const y = anime.random(mouse_y - spread, mouse_y + spread);
          return y;
        },
        alpha: { delay: 300, duration: 500, value: 0 },
        easing: "easeOutQuint",
        complete: () => {
          for (let particle of particles) {
            this.app.stage.removeChild(particle);
          }
        },
      });
    },
  },
};
</script>
