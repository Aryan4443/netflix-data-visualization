#!/bin/bash

# GitHub Push Script for Netflix Data Visualization Project

echo "🚀 Preparing to push to GitHub..."
echo ""

# Check if git user is configured
if ! git config user.name > /dev/null 2>&1; then
    echo "⚠️  Git user.name is not set"
    read -p "Enter your name for Git commits: " git_name
    git config user.name "$git_name"
fi

if ! git config user.email > /dev/null 2>&1; then
    echo "⚠️  Git user.email is not set"
    read -p "Enter your email for Git commits: " git_email
    git config user.email "$git_email"
fi

echo ""
echo "📦 Adding all files..."
git add .

echo ""
echo "✅ Checking what will be committed..."
git status --short | head -10
echo ""

read -p "Continue with commit? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "💾 Creating initial commit..."
    git commit -m "Initial commit: Netflix data visualization dashboard with real-time API integration"
    
    echo ""
    echo "✅ Commit created successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to https://github.com and create a new repository"
    echo "2. Name it: netflix-data-visualization (or any name you prefer)"
    echo "3. DON'T initialize with README (we already have one)"
    echo "4. Copy the repository URL"
    echo "5. Run these commands (replace YOUR_USERNAME and REPO_NAME):"
    echo ""
    echo "   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    echo "📝 Or follow the detailed guide in GITHUB_SETUP.md"
else
    echo "❌ Cancelled. Run this script again when ready."
fi

