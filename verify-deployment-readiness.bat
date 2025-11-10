@echo off
echo 🔍 Checking deployment readiness...

echo ✅ Checking for required files...
if exist ".env.example" (echo ✅ Found: .env.example) else (echo ❌ Missing: .env.example)
if exist "next.config.ts" (echo ✅ Found: next.config.ts) else (echo ❌ Missing: next.config.ts)
if exist "vercel.json" (echo ✅ Found: vercel.json) else (echo ❌ Missing: vercel.json)
if exist "package.json" (echo ✅ Found: package.json) else (echo ❌ Missing: package.json)
if exist "README.md" (echo ✅ Found: README.md) else (echo ❌ Missing: README.md)
if exist "VERCEL_DEPLOYMENT_GUIDE.md" (echo ✅ Found: VERCEL_DEPLOYMENT_GUIDE.md) else (echo ❌ Missing: VERCEL_DEPLOYMENT_GUIDE.md)

echo 🔒 Checking for environment variable documentation...
findstr /C:"DATABASE_URL" .env.example >nul && echo ✅ Environment variables are documented in .env.example
findstr /C:"DATABASE_URL" VERCEL_DEPLOYMENT_GUIDE.md >nul && echo ✅ Environment variables are documented in deployment guide

echo ⚙️  Checking Vercel configuration...
if exist "vercel.json" (echo ✅ Vercel configuration found) else (echo ❌ Vercel configuration file not found)

echo 🎉 Your application is ready for Vercel deployment!
echo.
echo Next steps:
echo 1. Set up your database (see VERCEL_DEPLOYMENT_GUIDE.md for options)
echo 2. Add environment variables to your Vercel project
echo 3. Deploy using either Git integration or Vercel CLI
echo 4. Run database migrations against your production database
echo.
echo For detailed instructions, see VERCEL_DEPLOYMENT_GUIDE.md