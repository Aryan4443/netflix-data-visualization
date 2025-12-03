# Setup Instructions - Installing Node.js

You need to install Node.js (which includes npm) to run this project. Here are the easiest options:

## Option 1: Direct Download (Easiest - Recommended)

1. **Visit the Node.js website:**

   - Go to: https://nodejs.org/
   - Click the big green "LTS" (Long Term Support) button to download

2. **Install the package:**

   - Open the downloaded `.pkg` file
   - Follow the installation wizard (just click "Next" through the steps)
   - This will install both Node.js and npm

3. **Verify installation:**

   - Open Terminal
   - Run: `node --version` (should show something like v20.x.x)
   - Run: `npm --version` (should show something like 10.x.x)

4. **Then run the project:**
   ```bash
   cd "/Users/aryanlakhani/Desktop/data visualization"
   npm install
   npm run dev
   ```

## Option 2: Install Homebrew First (More Advanced)

If you want to use Homebrew (useful for installing other development tools):

1. **Install Homebrew:**

   - Open Terminal
   - Run this command:
     ```bash
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```
   - Enter your Mac password when prompted
   - Wait for installation to complete

2. **Install Node.js via Homebrew:**

   ```bash
   brew install node
   ```

3. **Verify installation:**

   ```bash
   node --version
   npm --version
   ```

4. **Then run the project:**
   ```bash
   cd "/Users/aryanlakhani/Desktop/data visualization"
   npm install
   npm run dev
   ```

## After Installation

Once Node.js is installed, come back to this project and run:

```bash
npm install
npm run dev
```

The dashboard will open at `http://localhost:5173` in your browser!

---

**Note:** If you're still having issues, make sure to:

- Close and reopen Terminal after installing Node.js
- Or restart your computer if needed
