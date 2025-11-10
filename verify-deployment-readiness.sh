#!/bin/bash
# Verification script for Vercel deployment readiness

echo "🔍 Checking deployment readiness..."

# Check if required files exist
echo "✅ Checking for required files..."
files=(".env.example" "next.config.ts" "vercel.json" "package.json" "README.md" "VERCEL_DEPLOYMENT_GUIDE.md")
missing_files=()

for file in "${files[@]}"; do
    if [[ ! -f "$file" ]]; then
        missing_files+=("$file")
        echo "❌ Missing: $file"
    else
        echo "✅ Found: $file"
    fi
done

if [[ ${#missing_files[@]} -gt 0 ]]; then
    echo "❌ Some required files are missing. Please add them before deployment."
    exit 1
fi

# Check if build works locally
echo "🔧 Testing build process..."
if npm run build; then
    echo "✅ Build successful"
else
    echo "❌ Build failed - please fix errors before deploying"
    exit 1
fi

# Verify important environment variables are documented
echo "🔒 Checking for environment variable documentation..."
if grep -q "DATABASE_URL\|BETTER_AUTH_SECRET\|NEXT_PUBLIC_BETTER_AUTH_URL" .env.example; then
    echo "✅ Environment variables are documented in .env.example"
else
    echo "⚠️  Environment variables may not be properly documented"
fi

if grep -q "DATABASE_URL\|BETTER_AUTH_SECRET\|NEXT_PUBLIC_BETTER_AUTH_URL" VERCEL_DEPLOYMENT_GUIDE.md; then
    echo "✅ Environment variables are documented in deployment guide"
else
    echo "⚠️  Environment variables may not be properly documented in deployment guide"
fi

# Check for vercel.json configuration
echo "⚙️  Checking Vercel configuration..."
if [[ -f "vercel.json" ]]; then
    if grep -q "version\|builds\|routes" vercel.json; then
        echo "✅ Vercel configuration found and appears valid"
    else
        echo "⚠️  Vercel configuration file exists but may be incomplete"
    fi
else
    echo "❌ Vercel configuration file (vercel.json) not found"
fi

echo "🎉 Your application is ready for Vercel deployment!"
echo ""
echo "Next steps:"
echo "1. Set up your database (see VERCEL_DEPLOYMENT_GUIDE.md for options)"
echo "2. Add environment variables to your Vercel project"
echo "3. Deploy using either Git integration or Vercel CLI"
echo "4. Run database migrations against your production database"
echo ""
echo "For detailed instructions, see VERCEL_DEPLOYMENT_GUIDE.md"