# 🚀 Push to GitHub - Simple Guide

Follow these steps to push your project to GitHub:

## Step 1: Set Up Git (One-time setup)

Run these commands in your terminal:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Replace with your actual name and email (the email should match your GitHub account).

## Step 2: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `netflix-data-visualization`
3. Description: `Interactive data visualization dashboard for Netflix content analysis`
4. Choose: **Public** (so employers can see it!)
5. **DON'T** check "Add a README file" (we already have one)
6. Click **"Create repository"**

## Step 3: Push Your Code

After creating the repo, GitHub will show you commands. Run these in your project directory:

```bash
# Make sure you're in the project directory
cd "/Users/aryanlakhani/Desktop/data visualization"

# Create initial commit
git add .
git commit -m "Initial commit: Netflix data visualization dashboard"

# Add GitHub repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/netflix-data-visualization.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Important:** Replace `YOUR_USERNAME` with your actual GitHub username!

## Step 4: Verify

- Go to your GitHub repository page
- You should see all your files
- ✅ `.env` file should NOT be there (it's protected!)

## Troubleshooting

**If you get "authentication failed":**

- GitHub now requires a Personal Access Token instead of password
- Create one at: https://github.com/settings/tokens
- Select scope: `repo`
- Use the token as your password when pushing

**If you already have a repo and want to reset:**

```bash
git remote remove origin  # Remove old remote
# Then follow Step 3 again
```

---

**Need help?** Check `GITHUB_SETUP.md` for more details!
