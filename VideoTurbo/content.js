// 创建控制面板
function createSpeedController() {
  // 保存当前设置的速度
  let currentSpeed = 1.0;
  let originalSpeed = 1.0;
  let isKeyPressed = false;

  // 创建图标
  const icon = document.createElement('div');
  icon.id = 'speed-control-icon';
  icon.innerHTML = '⚡'; // 使用闪电符号作为图标
  document.body.appendChild(icon);

  // 创建控制面板（初始隐藏）
  const controller = document.createElement('div');
  controller.id = 'video-speed-controller';
  controller.style.display = 'none'; // 初始隐藏
  controller.innerHTML = `
    <input type="number" id="speed-input" min="0.1" max="16" step="0.1" value="1.0">
    <button id="speed-button">设置速度</button>
  `;
  document.body.appendChild(controller);

  // 添加图标点击事件
  icon.addEventListener('click', () => {
    const controller = document.getElementById('video-speed-controller');
    controller.style.display = controller.style.display === 'none' ? 'flex' : 'none';
  });

  // 添加速度设置事件
  document.getElementById('speed-button').addEventListener('click', () => {
    const speed = parseFloat(document.getElementById('speed-input').value);
    if (speed >= 0.1 && speed <= 16) {
      currentSpeed = speed;
      originalSpeed = speed;
      const videos = document.getElementsByTagName('video');
      Array.from(videos).forEach(video => {
        video.playbackRate = speed;
      });
      // 设置完后隐藏控制面板
      document.getElementById('video-speed-controller').style.display = 'none';
    }
  });

  // 添加键盘事件监听
  document.addEventListener('keydown', (e) => {
    // 检查是否是数字键且之前未按下
    if (!isKeyPressed && e.key >= '1' && e.key <= '9') {
      isKeyPressed = true;
      // 特殊处理数字5，设置为1.5倍速
      const speed = e.key === '5' ? 1.5 : parseInt(e.key);
      const videos = document.getElementsByTagName('video');
      Array.from(videos).forEach(video => {
        video.playbackRate = speed;
      });
    }
  });

  document.addEventListener('keyup', (e) => {
    // 检查是否是数字键（1-9）
    if (e.key >= '1' && e.key <= '9') {
      isKeyPressed = false;
      const videos = document.getElementsByTagName('video');
      Array.from(videos).forEach(video => {
        video.playbackRate = originalSpeed;
      });
    }
  });

  // 点击页面其他地方时隐藏控制面板
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#video-speed-controller') && 
        !e.target.closest('#speed-control-icon')) {
      document.getElementById('video-speed-controller').style.display = 'none';
    }
  });
}

// 检测视频元素
function checkForVideo() {
  const videos = document.getElementsByTagName('video');
  if (videos.length > 0) {
    // 如果控制组件还不存在，则创建它
    if (!document.getElementById('speed-control-icon')) {
      createSpeedController();
    }
  }
}

// 创建观察器来监视DOM变化
const observer = new MutationObserver(checkForVideo);
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// 初始检查
checkForVideo(); 