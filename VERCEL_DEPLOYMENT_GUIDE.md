# Deploying to Vercel - Complete Guide

This guide provides step-by-step instructions to deploy your Next.js application to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Git repository with your code pushed to GitHub, GitLab, or Bitbucket
3. Node.js 18+ installed locally (for testing purposes)

## Step-by-Step Deployment Process

### Option 1: Using Git Integration (Recommended)

1. **Push your code to a Git repository**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Go to [vercel.com](https://vercel.com) and sign in**

3. **Import your project**
   - Click "New Project"
   - Select your Git provider (GitHub, GitLab, or Bitbucket)
   - Find and import your repository
   - Click "Import Project"

4. **Configure your project settings**
   - Framework Preset: Auto-detected (Next.js)
   - Root Directory: Leave as default
   - Build Command: `npm run vercel-build` (or just `next build`)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install`

5. **Set Environment Variables**
   Click on "Environment Variables" and add the following:
   
   | Key | Value |
   |-----|-------|
   | `DATABASE_URL` | Your PostgreSQL database connection string |
   | `BETTER_AUTH_SECRET` | A secure secret key (generate with a password manager) |
   | `BETTER_AUTH_URL` | Your Vercel deployment URL (e.g. `https://your-app.vercel.app`) |
   | `NEXT_PUBLIC_BETTER_AUTH_URL` | Your Vercel deployment URL (e.g. `https://your-app.vercel.app`) |

6. **Deploy**
   - Click "Deploy" to start the deployment process
   - Wait for the build to complete (typically 2-5 minutes)
   - Your site will be live at the provided URL

### Option 2: Using Vercel CLI (For local deployment)

1. **Install Vercel CLI globally**
   ```bash
   npm install -g vercel
   ```

2. **Login to your Vercel account**
   ```bash
   vercel login
   ```

3. **Deploy your project**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? `Y`
   - Which scope? Select your account
   - Link to existing project? `N` (unless you have an existing project)
   - What's your project's name? (use default or enter a name)
   - In which directory is your code located? `.`
   - Build Command: `npm run vercel-build`
   - Development Command: Leave blank
   - Would you like to install the Vercel GitHub App? `N` (or `Y` for Git integration)

4. **Set Environment Variables**
   ```bash
   vercel env add
   ```
   
   Add each environment variable as prompted.

5. **Final deployment**
   ```bash
   vercel --prod
   ```

## Required Environment Variables

For your application to work properly on Vercel, you need to set these environment variables:

### Database Configuration
```
DATABASE_URL=postgresql://username:password@hostname:port/database_name
```

### Authentication Configuration
```
BETTER_AUTH_SECRET=your-super-secure-32-character-secret-key
BETTER_AUTH_URL=https://your-deployment-url.vercel.app
NEXT_PUBLIC_BETTER_AUTH_URL=https://your-deployment-url.vercel.app
```

## Database Setup for Production

Since Vercel deployments are serverless, you need a managed database service. Here are some options:

### Option 1: PlanetScale (Recommended)
- Sign up at [planetscale.com](https://planetscale.com)
- Create a new database
- Get the connection string and use it as your DATABASE_URL

### Option 2: Supabase
- Sign up at [supabase.com](https://supabase.com)
- Create a new project
- Use the PostgreSQL connection string as your DATABASE_URL

### Option 3: AWS RDS or Google Cloud SQL
- Set up a PostgreSQL instance
- Configure security groups/firewall to allow connections
- Use the connection string as your DATABASE_URL

## Running Database Migrations

After deployment, you need to run your database schema to set up your tables:

1. **Run the db:push command locally against your production database**
   ```bash
   # Set your DATABASE_URL to your production database
   DATABASE_URL=your-production-database-url npm run db:push
   ```

2. **Alternative: Use Drizzle Studio to manage your database**
   ```bash
   npm run db:studio
   ```

## Post-Deployment Steps

1. **Verify your deployment**
   - Visit your deployment URL
   - Check that all pages load correctly
   - Test authentication functionality

2. **Set up custom domain (optional)**
   - Go to your Vercel project settings
   - Navigate to "Domains"
   - Add your custom domain
   - Follow the DNS configuration instructions

3. **Configure GitHub integration (recommended)**
   - Install the Vercel GitHub app
   - Connect your repository
   - Automatic deployments will happen on every push to main branch

## Troubleshooting Common Issues

### Environment Variables Not Working
- Make sure you've set environment variables in the Vercel dashboard
- Verify that you're using the correct variable names
- For production, ensure variables are set for "Production" and "Preview" environments

### Database Connection Issues
- Verify your DATABASE_URL is correct
- Ensure your database allows connections from Vercel's IP ranges
- Check that your database credentials are correct

### Authentication Issues
- Ensure BETTER_AUTH_URL matches your actual deployment URL
- Check that NEXT_PUBLIC_BETTER_AUTH_URL is also set correctly
- Verify that your BETTER_AUTH_SECRET is consistent across environments

### Build Failures
- Check that all dependencies are properly listed in package.json
- Verify that your build command is correct
- Ensure there are no server-side dependencies that won't work in a serverless environment

## Performance Optimizations

Your application is already optimized for Vercel with:
- Next.js 15 with App Router
- Image optimization through Vercel's built-in Image Optimization
- Server-side rendering where needed
- Client-side hydration for interactive components

## Scaling Considerations

- Your application uses serverless functions that automatically scale
- Database performance depends on your database provider
- For high-traffic applications, consider upgrading your database plan
- Monitor your application performance using Vercel Analytics

## Security Best Practices

- Use strong, unique values for BETTER_AUTH_SECRET
- Regularly rotate your database credentials
- Enable 2FA on your Vercel account
- Keep dependencies up to date
- Regularly audit your environment variables

## Updating Your Deployment

For Git integration:
- Simply push changes to your repository
- Vercel will automatically deploy new versions

For CLI deployments:
- Run `vercel` again to create a preview deployment
- Run `vercel --prod` to update the production deployment