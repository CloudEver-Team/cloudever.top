// Arknights-style data stream particle system
class DataStreamSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.streams = [];
    this.streamCount = 25;
    this.hexChars = '0123456789ABCDEF';

    this.resize();
    this.init();
    this.animate();

    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    this.streams = [];
    for (let i = 0; i < this.streamCount; i++) {
      this.streams.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height - this.canvas.height,
        speed: Math.random() * 3 + 2,
        length: Math.random() * 100 + 50,
        opacity: Math.random() * 0.5 + 0.3,
        chars: this.generateHexString(Math.floor(Math.random() * 8 + 4))
      });
    }
  }

  generateHexString(length) {
    let str = '';
    for (let i = 0; i < length; i++) {
      str += this.hexChars[Math.floor(Math.random() * this.hexChars.length)];
    }
    return str;
  }

  animate() {
    this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.streams.forEach((stream) => {
      stream.y += stream.speed;

      if (stream.y > this.canvas.height + stream.length) {
        stream.y = -stream.length;
        stream.x = Math.random() * this.canvas.width;
        stream.chars = this.generateHexString(Math.floor(Math.random() * 8 + 4));
      }

      // Draw stream tail
      const gradient = this.ctx.createLinearGradient(stream.x, stream.y - stream.length, stream.x, stream.y);
      gradient.addColorStop(0, `rgba(255, 107, 0, 0)`);
      gradient.addColorStop(0.5, `rgba(255, 107, 0, ${stream.opacity * 0.4})`);
      gradient.addColorStop(1, `rgba(255, 215, 0, ${stream.opacity})`);

      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(stream.x, stream.y - stream.length);
      this.ctx.lineTo(stream.x, stream.y);
      this.ctx.stroke();

      // Draw hex text
      this.ctx.fillStyle = `rgba(255, 215, 0, ${stream.opacity * 0.8})`;
      this.ctx.font = '10px "Courier New", monospace';
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
      this.ctx.fillText(stream.chars, stream.x + 4, stream.y);
      this.ctx.shadowBlur = 0;

      // Draw bright head
      this.ctx.fillStyle = `rgba(255, 215, 0, ${stream.opacity})`;
      this.ctx.beginPath();
      this.ctx.arc(stream.x, stream.y, 2, 0, Math.PI * 2);
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDataStreams);
} else {
  initDataStreams();
}

function initDataStreams() {
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    new DataStreamSystem(canvas);
  }
}
