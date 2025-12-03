# Netflix Content Analytics Dashboard

An interactive data visualization dashboard analyzing Netflix's content library. This project demonstrates data analysis, visualization skills, and modern web development practices - perfect for showcasing your abilities to potential employers like Netflix.

## ⚠️ Prerequisites

**You need Node.js installed to run this project.** If you see "npm command not found", please check `SETUP_INSTRUCTIONS.md` for installation steps.

## 🔴 Real-Time API Integration

**This project supports real-time data from TMDB API!** 

- ✅ **With API key:** Fetches live Netflix content data
- ✅ **Without API key:** Uses sample data (works perfectly!)
- ✅ **Automatic fallback:** If API fails, uses sample data

See `API_SETUP.md` for detailed setup instructions (takes 5 minutes, completely free!).

## 🎯 Project Overview

This dashboard provides comprehensive insights into Netflix content through multiple interactive visualizations:
- **Genre Distribution**: Bar chart showing content distribution across different genres (hover to see titles!)
- **Yearly Trends**: Line chart tracking content releases over time (hover to see titles!)
- **Content Types**: Pie chart breaking down TV Shows vs Movies vs Documentaries
- **Top Rated Content**: Sortable table of highest-rated titles
- **Country Distribution**: Horizontal bar chart showing content by origin country (hover to see titles!)
- **Rating Distribution**: Bar chart categorizing content by rating ranges
- **Complete Content Library**: Full searchable and sortable table with all movies and shows

## ✨ Features

- **Interactive Filtering**: Filter all visualizations by genre in real-time
- **Complete Content List**: Full searchable and sortable table showing all movies and shows with details
- **Interactive Tooltips**: Hover over chart elements to see actual content titles
- **Search Functionality**: Search content by title, genre, or country
- **Sortable Tables**: Click column headers to sort by any field
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Netflix-inspired dark theme with smooth animations
- **Real-time Statistics**: Dynamic stat cards showing key metrics
- **Multiple Chart Types**: Bar charts, line charts, pie charts, and data tables

## 🛠️ Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Recharts**: Beautiful, composable charting library
- **CSS3**: Custom styling with modern CSS features

## 📦 Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd "data visualization"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🚀 Building for Production

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist` directory. You can preview the production build with:

```bash
npm run preview
```

## 📊 Data Structure

The project uses a sample dataset of 40 Netflix titles with the following fields:
- `id`: Unique identifier
- `title`: Content title
- `type`: TV Show, Movie, or Documentary
- `genre`: Content genre
- `year`: Release year
- `rating`: IMDB-style rating (0-10)
- `duration`: Length or number of seasons
- `country`: Country of origin

## 🎨 Customization

### Adding More Data

Edit `src/data/netflixData.js` to add more content entries following the same structure.

### Styling

- Main styles: `src/index.css`
- Component styles: Individual `.css` files in `src/components/`
- Color scheme: Netflix red (`#e50914`) is used throughout

### Adding New Visualizations

1. Create a new component in `src/components/charts/`
2. Import and use it in `src/components/Dashboard.jsx`
3. Add corresponding data processing functions in `src/data/netflixData.js`

## 📝 Project Highlights for Interviews

This project demonstrates:

1. **Data Processing**: Efficient data transformation and aggregation
2. **Component Architecture**: Modular, reusable React components
3. **State Management**: React hooks for filtering and data flow
4. **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
5. **Performance**: Memoization with `useMemo` for optimized re-renders
6. **User Experience**: Interactive filtering and smooth animations
7. **Code Organization**: Clean file structure and separation of concerns

## 🎓 Learning Outcomes

- React functional components and hooks
- Data visualization best practices
- Responsive web design
- Modern JavaScript (ES6+)
- Component-based architecture
- CSS Grid and Flexbox layouts

## 📄 License

This project is created for educational and portfolio purposes.

---

**Built with ❤️ for landing that Netflix interview!** 🎬

