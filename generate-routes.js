const fs = require('fs');
const path = require('path');

// 文档根目录
const DOCS_ROOT = path.join(__dirname, 'docs', 'src');
// 配置文件路径
const CONFIG_PATH = path.join(__dirname, 'docs', '.vitepress', 'config.mts');

// 分类名称映射
const CATEGORY_MAP = {
  'css样式': 'CSS技巧',
  '三方js': '三方js',
  '其他': '其他'
};

/**
 * 扫描目录结构，生成路由配置
 * @param {string} dir 目录路径
 * @returns {Array} 路由配置数组
 */
function scanDirectory(dir) {
  const result = [];
  
  // 读取目录内容
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  // 过滤出目录和 .md 文件
  const dirs = entries.filter(entry => entry.isDirectory() && entry.name !== 'public');
  
  // 处理每个目录
  dirs.forEach(dirEntry => {
    const dirPath = path.join(dir, dirEntry.name);
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    
    // 过滤出 .md 文件
    const mdFiles = files.filter(file => file.isFile() && file.name.endsWith('.md'));
    
    if (mdFiles.length > 0) {
      // 生成目录的路由配置
      const categoryName = CATEGORY_MAP[dirEntry.name] || dirEntry.name;
      const categoryConfig = {
        text: categoryName,
        link: `/${dirEntry.name}/${mdFiles[0].name.replace('.md', '')}`,
        items: []
      };
      
      // 处理每个 .md 文件
      mdFiles.forEach(fileEntry => {
        const fileName = fileEntry.name.replace('.md', '');
        categoryConfig.items.push({
          text: fileName,
          link: `/${dirEntry.name}/${fileName}`
        });
      });
      
      result.push(categoryConfig);
    }
  });
  
  return result;
}

/**
 * 将对象转换为 JavaScript 对象字面量字符串
 * @param {any} obj 要转换的对象
 * @param {number} indent 缩进级别
 * @returns {string} JavaScript 对象字面量字符串
 */
function objToLiteral(obj, indent = 0) {
  const spaces = '  '.repeat(indent);
  
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    
    const items = obj.map(item => `\n${spaces}  ${objToLiteral(item, indent + 1)}`).join(',');
    return `[${items}\n${spaces}]`;
  } else if (typeof obj === 'object' && obj !== null) {
    if (Object.keys(obj).length === 0) return '{}';
    
    const items = Object.entries(obj).map(([key, value]) => 
      `\n${spaces}  ${key}: ${objToLiteral(value, indent + 1)}`
    ).join(',');
    return `{${items}\n${spaces}}`;
  } else if (typeof obj === 'string') {
    return `"${obj}"`;
  } else {
    return String(obj);
  }
}

/**
 * 生成完整的配置文件内容
 * @param {Array} sidebarItems 侧边栏配置项
 * @returns {string} 配置文件内容
 */
function generateConfig(sidebarItems) {
  return `import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "开发问题总结",
  description: "开发中遇到的问题总结",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" }
    ],

    sidebar: [
      {
        text: "开发问题总结",
        items: ${objToLiteral(sidebarItems, 4)}
      }
    ],

    outline: {
      level: [2, 3],
      label: "目录"
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/a-xcm/a-xcm.github.io" }
    ]
  },
  srcDir: "src"
})
`;
}

/**
 * 主函数
 */
function main() {
  console.log('开始生成路由配置...');
  
  try {
    // 扫描目录结构
    const sidebarItems = scanDirectory(DOCS_ROOT);
    
    // 生成配置文件内容
    const configContent = generateConfig(sidebarItems);
    
    // 写入配置文件
    fs.writeFileSync(CONFIG_PATH, configContent, 'utf8');
    
    console.log('路由配置生成成功！');
    console.log(`生成的配置已写入：${CONFIG_PATH}`);
    console.log('生成的路由项数量：', sidebarItems.length);
    
    sidebarItems.forEach(item => {
      console.log(`- ${item.text}: ${item.items.length} 个文档`);
    });
    
  } catch (error) {
    console.error('生成路由配置失败：', error.message);
    process.exit(1);
  }
}

// 执行主函数
if (require.main === module) {
  main();
}

module.exports = { scanDirectory, generateConfig };
