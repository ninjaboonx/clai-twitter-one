# Test PostgreSQL Connection
$env:PGPASSWORD = 'postgres#hSfQUV7Nbomf1'
$env:Path += ';C:\Program Files\PostgreSQL\17\bin'

Write-Host "Testing PostgreSQL connection..."

# Test connection to postgres database
try {
    $result = & 'C:\Program Files\PostgreSQL\17\bin\psql.exe' -U postgres -h localhost -p 5432 -d postgres -c "SELECT 'Connection successful' AS status;" 2>&1
    Write-Host "Connection to 'postgres' database: SUCCESS"
    $result
} catch {
    Write-Host "Connection to 'postgres' database: FAILED"
    Write-Host "Error: $_"
}

# Test connection to twitter_dashboard
try {
    $result = & 'C:\Program Files\PostgreSQL\17\bin\psql.exe' -U postgres -h localhost -p 5432 -d twitter_dashboard -c "SELECT 'Connection successful' AS status;" 2>&1
    Write-Host "`nConnection to 'twitter_dashboard' database: SUCCESS"
    $result
} catch {
    Write-Host "`nConnection to 'twitter_dashboard' database: FAILED"
    Write-Host "Error: $_"
}

# Test connection with application user
try {
    $result = & 'C:\Program Files\PostgreSQL\17\bin\psql.exe' -U twitter_user -h localhost -p 5432 -d twitter_dashboard -c "SELECT 'Connection successful' AS status;" 2>&1
    Write-Host "`nConnection with 'twitter_user': SUCCESS"
    $result
} catch {
    Write-Host "`nConnection with 'twitter_user': FAILED"
    Write-Host "Error: $_"
}
