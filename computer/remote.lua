print("Remote control service")
term.write("Server address? ")

local addr = read()

print("Establishing connection...")
http.websocketAsync(addr)
local sock = nil

function handleConnSuccess(url, handle)
    print("Connection successful!")
    sock = handle
end

function handleConnFail(url, err)
    -- Attempt reconnect over and over
    print("Connection failure!")
    handleTerminate()
    sleep(1)
    print("Establishing connection...")
    
    sock = nil
    http.websocketAsync(addr);
end

function handleTerminate()
    -- Graceful end
    if sock ~= false and sock ~= nil then
        sock.close()
        sock = nil
    end

    print("Ended connection")
end

function handleMessage(url, msg, isBinary)
    load(msg)()
    print("Message: " .. msg)
end

while true do
    local event, a1, a2, a3 = os.pullEventRaw()

    if event == "terminate" then
        handleTerminate()
        break
    elseif event == "key" and a1 == 32 then
        handleTerminate()
        break
    elseif event == "websocket_success" then
        handleConnSuccess(a1, a2)
    elseif event == "websocket_failure" or event == "websocket_closed" then
        handleConnFail(a1, a2)
    elseif event == "websocket_message" then
        handleMessage(a1, a2, a3)
    end
end