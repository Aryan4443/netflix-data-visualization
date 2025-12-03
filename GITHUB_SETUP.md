# GitHub Setup Guide

Follow these steps to push your Netflix Data Visualization project to GitHub.

## Step 1: Create GitHub Repository

1. Go to https://github.com
2. Click the **+** icon in the top right → **New repository**
3. Name it: `netflix-data-visualization` (or any name you prefer)
4. Description: "Interactive data visualization dashboard for Netflix content analysis"
5. Make it **Public** (so employers can see it!)
6. **DON'T** check "Initialize with README" (we already have one)
7. Click **Create repository**

## Step 2: Push Your Code

After creating the repo, GitHub will show you commands. But we'll do it step by step:

```bash
# Initialize git (already done if you ran the setup script)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Netflix data visualization dashboard"

# Add your GitHub repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/netflix-data-visualization.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Important Notes

✅ Your `.env` file is already in `.gitignore` - your API key won't be pushed!

✅ The project will work without API key (uses sample data)

✅ You can share the repo link in your resume/portfolio

## After Pushing

- Add a link to your live demo (if you deploy it)
- Add screenshots to the README
- Tag it with relevant topics: `react`, `data-visualization`, `netflix`, `api`, `d3`, `recharts`

---

**Need help?** Make sure you have a GitHub account first at https://github.com/signup
