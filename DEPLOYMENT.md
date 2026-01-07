# Deployment Guide for NumOSINT

## 🚀 Deploying to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier works perfectly)
- Git installed on your machine

### Step-by-Step Deployment

#### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub** (Already done)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [https://vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select "Import Git Repository"
   - Choose your GitHub repository: `wdw03/numosint`

3. **Configure Project**
   - Vercel will auto-detect it as a Create React App
   - Root Directory: `hacker-osint-tool`
   - Framework Preset: Create React App
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `build` (auto-detected)

4. **Environment Variables** (Optional)
   - You can add environment variables if needed
   - For now, none are required

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - Your site will be live at `https://your-project-name.vercel.app`

#### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from project directory**
   ```bash
   cd hacker-osint-tool
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? Y
   - Which scope? (select your account)
   - Link to existing project? N
   - Project name? numosint
   - In which directory is your code located? ./

5. **Production Deployment**
   ```bash
   vercel --prod
   ```

#### Option 3: GitHub Integration (Automatic Deployments)

1. After initial deployment via Dashboard or CLI
2. Vercel automatically sets up GitHub integration
3. Every push to `main` branch will trigger automatic deployment
4. Preview deployments for pull requests

### 🔧 Configuration Files

The following files are configured for Vercel deployment:

- **vercel.json**: Vercel-specific configuration
- **.gitignore**: Prevents unnecessary files from being committed
- **package.json**: Contains build scripts and dependencies

### 📊 Post-Deployment

After successful deployment:

1. **Custom Domain** (Optional)
   - Go to your project in Vercel Dashboard
   - Settings → Domains
   - Add your custom domain

2. **Environment Variables**
   - Settings → Environment Variables
   - Add any production-specific variables

3. **Performance Monitoring**
   - Vercel provides automatic performance monitoring
   - Check Analytics tab in dashboard

4. **SSL Certificate**
   - Automatically provisioned by Vercel
   - Your site will be HTTPS by default

### 🌐 Your Live URL

After deployment, your app will be available at:
- Production: `https://numosint.vercel.app` (or custom domain)
- Preview: `https://numosint-git-branch.vercel.app` (for branches)

### 🔄 Updating Your Deployment

To update your live site:

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will automatically detect the push and redeploy your site.

### 🐛 Troubleshooting

**Build Fails:**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

**404 Errors:**
- Check vercel.json rewrites configuration
- Ensure SPA routing is properly configured

**Slow Loading:**
- Enable Vercel's Edge Network
- Consider code splitting
- Optimize images and assets

### 📱 Testing Your Deployment

1. Visit your Vercel URL
2. Test on different devices (mobile, tablet, desktop)
3. Check all features:
   - Phone number search
   - Terminal mode
   - Stealth mode
   - Export functionality
   - Responsive design

### 🎉 Success!

Your NumOSINT tool is now live on Vercel!

Share your deployment URL:
`https://your-project.vercel.app`

---

**Need Help?**
- [Vercel Documentation](https://vercel.com/docs)
- [Create React App Deployment](https://create-react-app.dev/docs/deployment/)
- [GitHub Issues](https://github.com/wdw03/numosint/issues)