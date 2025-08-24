#!/usr/bin/env python3
"""
Main entry point for the Claude Code project.
Serves the original iPhone UI website.
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

def main():
    """
    Main function to run the web server for the iPhone UI website.
    """
    # Get the project root directory
    project_root = Path(__file__).parent.parent
    web_dir = project_root / "web"
    
    # Change to the web directory
    os.chdir(web_dir)
    
    # Set up the server
    PORT = int(os.environ.get("PORT", 8000))
    HOST = "0.0.0.0"  # Bind to all interfaces for Railway deployment
    Handler = http.server.SimpleHTTPRequestHandler
    
    print(f"🍎 Starting Original iPhone UI Server...")
    print(f"📱 Server running at: http://{HOST}:{PORT}")
    print(f"📁 Serving files from: {web_dir}")
    print(f"🚀 Open your browser and navigate to the URL above!")
    print(f"🛑 Press Ctrl+C to stop the server\n")
    
    try:
        with socketserver.TCPServer((HOST, PORT), Handler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 Server stopped. Thanks for using the Original iPhone UI!")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {PORT} is already in use. Try a different port or stop the other server.")
        else:
            print(f"❌ Server error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
