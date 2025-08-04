# 🔤 Arabic to Kurdish Converter Suite

[![Next.js](https://img.shields.io/badge/Next.js-14.2.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

A professional, feature-rich Arabic to Kurdish text converter with dual mapping systems, real-time conversion, and modern UI. Built with Next.js and designed for both casual users and linguistic professionals.

![Demo](https://img.shields.io/badge/Status-Production_Ready-brightgreen?style=for-the-badge)

## ✨ Key Features

### 🚀 Dual Conversion Systems
- **Pro Version**: Enhanced mappings with specialized characters (`چ`, `پ`, `گ`, `ڤ`)
- **Standard Version**: Traditional mappings optimized for formal texts
- **Character Mapping**: 60+ Arabic to Kurdish character mappings

### ⚡ Real-time Capabilities
- **Instant Conversion**: Text converts as you type
- **Live Statistics**: Character, word, and line counts
- **Smart Detection**: Automatic Arabic character recognition

### 📁 Export & History
- **Multiple Formats**: TXT, JSON, CSV, Excel exports
- **Conversion History**: Auto-saved with timestamps
- **Session Memory**: Last 10 conversions stored locally

### 🎨 Modern Interface
- **Dark Mode**: Beautiful dark/light theme toggle
- **Responsive Design**: Works on desktop, tablet, and mobile
- **RTL/LTR Support**: Proper text direction handling
- **Professional Typography**: Noto Sans Arabic font integration

### 🔧 Advanced Controls
- **Font Size Control**: Small to Extra Large options
- **Real-time Toggle**: Enable/disable instant conversion
- **Full Screen Mode**: Distraction-free conversion
- **Statistics Toggle**: Show/hide detailed analytics

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bazhdarrzgar/ali_k_samik_unikurd_jino.git
   cd ali_k_samik_unikurd_jino
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   yarn dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
yarn build
yarn start
```

## 📖 Usage Guide

### Basic Conversion
1. **Select Version**: Choose between Pro or Standard conversion
2. **Input Text**: Type or paste Arabic text in the input area
3. **View Results**: Kurdish text appears instantly (real-time mode) or click Convert
4. **Copy Results**: Use the copy button to copy converted text

### Sample Texts
Test the converter with pre-loaded samples:
- **Basic Greeting**: Simple Arabic greeting
- **Complex Text**: Text with diacritical combinations
- **Difference Test**: Characters that differ between Pro/Standard
- **Long Sentence**: Comprehensive conversion test

### Export Options
- **📄 TXT**: Plain text with conversion details
- **📊 JSON**: Structured data with metadata and statistics
- **📈 CSV**: Word-by-word conversion table
- **📋 Excel**: Formatted spreadsheet with analysis

### History Management
- **Auto-Save**: Conversions automatically saved to history
- **Load Previous**: Click any history entry to reload
- **Version Tracking**: Separate tracking for Pro/Standard conversions

## 🔍 Character Mapping Details

### Pro Version Mappings
```
ض → چ    ث → پ    ط → گ    ظ → ڤ
ء → و    لاَ → ڵا   رِ → ڕ    ىَ → ێ
```

### Standard Version Mappings  
```
ض → چ    ث → س    ط → ت    ظ → ز
ء → ئ    لاَ → ڵا   رِ → ڕ    ىَ → ێ
```

### Complex Diacriticals
Both versions handle complex patterns:
- `لاَ` → `ڵا` (LA with fatha)
- `رِ` → `ڕ` (RA with kasra) 
- `ىَ` → `ێ` (YA with fatha)
- `لَ` → `ڵ` (LA with fatha)

## 🛠 Technical Stack

### Frontend
- **Framework**: Next.js 14.2.3 (React 18)
- **Styling**: Tailwind CSS 3.4.1
- **Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Noto Sans Arabic

### Key Dependencies
- **UI Components**: `@radix-ui/*` family
- **Styling**: `tailwindcss`, `tailwindcss-animate`
- **Utilities**: `clsx`, `tailwind-merge`
- **Data**: `date-fns`, `uuid`

### Development Tools
- **Build**: Next.js with standalone output
- **Package Manager**: Yarn (recommended)
- **Code Quality**: ES6+, Modern React patterns

## 📁 Project Structure

```
├── app/
│   ├── page.js          # Main converter component
│   ├── layout.js        # Root layout with fonts
│   ├── globals.css      # Global styles
│   └── api/             # API routes (if needed)
├── components/
│   └── ui/              # Reusable UI components
├── lib/
│   └── utils.js         # Utility functions
├── hooks/               # Custom React hooks
├── public/              # Static assets
└── test_result.md       # Testing documentation
```

## 🎯 Use Cases

### Educational
- **Language Learning**: Arabic to Kurdish script learning
- **Academic Research**: Linguistic analysis and comparison
- **Text Processing**: Bulk document conversion

### Professional
- **Translation Services**: Quick script conversion
- **Publishing**: Multi-script document preparation
- **Digital Content**: Website/app localization

### Personal
- **Social Media**: Cross-script communication
- **Document Conversion**: Personal file translation
- **Cultural Exchange**: Bridge language barriers

## 🧪 Testing

The application includes comprehensive testing coverage:
- **Character Mapping**: All 60+ mappings verified
- **Real-time Conversion**: Instant conversion functionality
- **Export Functions**: All 4 export formats tested
- **UI Components**: Full interface testing
- **Responsive Design**: Cross-device compatibility

Run tests:
```bash
yarn test
# or check test_result.md for detailed test results
```

## 🎨 Design Principles

### User Experience
- **Simplicity**: Clean, intuitive interface
- **Accessibility**: Proper contrast and keyboard navigation
- **Performance**: Optimized for fast conversion
- **Reliability**: Consistent character mapping

### Technical Excellence
- **Modern Stack**: Latest React and Next.js
- **Type Safety**: Comprehensive error handling
- **Responsive**: Mobile-first design approach
- **SEO Ready**: Proper meta tags and structure

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style and patterns
- Add tests for new features
- Update documentation as needed
- Ensure responsive design compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Noto Sans Arabic**: Google Fonts for beautiful Arabic typography
- **Radix UI**: Accessible, unstyled UI components
- **Tailwind CSS**: Utility-first CSS framework
- **Next.js Team**: Amazing React framework

## 📞 Support

If you encounter any issues or have questions:

1. **Check the Issues**: [GitHub Issues](https://github.com/bazhdarrzgar/ali_k_samik_unikurd_jino/issues)
2. **Create a Report**: Detailed bug reports welcome
3. **Feature Requests**: Suggestions for improvements

---

<div align="center">

**Built with ❤️ for the Arabic and Kurdish communities**

[🌟 Star this repo](https://github.com/bazhdarrzgar/ali_k_samik_unikurd_jino) if you find it useful!

</div>
