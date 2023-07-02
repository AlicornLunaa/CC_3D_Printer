print("Remote control service")
term.write("Server address? ")

-- local addr = read()
addr = "ws://localhost:8080"

print("Establishing connection...")
http.websocketAsync(addr)
local sock = nil

function split(inputstr, sep)
    if sep == nil then
            sep = "%s"
    end

    local t={}

    for str in string.gmatch(inputstr, "([^"..sep.."]+)") do
            table.insert(t, str)
    end

    return t
end

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
    -- load(msg)()
    local args = split(msg)
    local res = false
    print("Message: " .. msg)

    if args[1] == "turtle.craft" then
        res = turtle.craft(tonumber(args[2]))
    elseif args[1] == "turtle.forward" then
        res = turtle.forward()
    elseif args[1] == "turtle.back" then
        res = turtle.back()
    elseif args[1] == "turtle.up" then
        res = turtle.up()
    elseif args[1] == "turtle.down" then
        res = turtle.down()
    elseif args[1] == "turtle.turnLeft" then
        res = turtle.turnLeft()
    elseif args[1] == "turtle.turnRight" then
        res = turtle.turnRight()
    elseif args[1] == "turtle.dig" then
        res = turtle.dig(args[2])
    elseif args[1] == "turtle.digUp" then
        res = turtle.digUp(args[2])
    elseif args[1] == "turtle.digDown" then
        res = turtle.digDown(args[2])
    elseif args[1] == "turtle.place" then
        res = turtle.place(args[2])
    elseif args[1] == "turtle.placeUp" then
        res = turtle.placeUp(args[2])
    elseif args[1] == "turtle.placeDown" then
        res = turtle.placeDown(args[2])
    elseif args[1] == "turtle.drop" then
        res = turtle.drop(tonumber(args[2]))
    elseif args[1] == "turtle.dropUp" then
        res = turtle.dropUp(tonumber(args[2]))
    elseif args[1] == "turtle.dropDown" then
        res = turtle.dropDown(tonumber(args[2]))
    elseif args[1] == "turtle.select" then
        res = turtle.select(tonumber(args[2]))
    elseif args[1] == "turtle.getItemCount" then
        res = turtle.getItemCount((args[2] == nil and {nil} or {tonumber(args[2])}))
    elseif args[1] == "turtle.getItemSpace" then
        res = turtle.getItemSpace((args[2] == nil and {nil} or {tonumber(args[2])}))
    elseif args[1] == "turtle.detect" then
        res = turtle.detect()
    elseif args[1] == "turtle.detectUp" then
        res = turtle.detectUp()
    elseif args[1] == "turtle.detectDown" then
        res = turtle.detectDown()
    elseif args[1] == "turtle.compare" then
        res = turtle.compare()
    elseif args[1] == "turtle.compareUp" then
        res = turtle.compareUp()
    elseif args[1] == "turtle.compareDown" then
        res = turtle.compareDown()
    elseif args[1] == "turtle.attack" then
        res = turtle.attack(args[2])
    elseif args[1] == "turtle.attackUp" then
        res = turtle.attackUp(args[2])
    elseif args[1] == "turtle.attackDown" then
        res = turtle.attackDown(args[2])
    elseif args[1] == "turtle.suck" then
        res = turtle.suck(tonumber(args[2]))
    elseif args[1] == "turtle.suckUp" then
        res = turtle.suckUp(tonumber(args[2]))
    elseif args[1] == "turtle.suckDown" then
        res = turtle.suckDown(tonumber(args[2]))
    elseif args[1] == "turtle.getFuelLevel" then
        res = turtle.getFuelLevel()
    elseif args[1] == "turtle.refuel" then
        res = turtle.refuel(tonumber(args[2]))
    elseif args[1] == "turtle.compareTo" then
        res = turtle.compareTo(tonumber(args[2]))
    elseif args[1] == "turtle.transferTo" then
        res = turtle.transferTo(tonumber(args[2]), tonumber(args[3]))
    elseif args[1] == "turtle.getSelectedSlot" then
        res = turtle.getSelectedSlot()
    elseif args[1] == "turtle.getFuelLimit" then
        res = turtle.getFuelLimit()
    elseif args[1] == "turtle.equipLeft" then
        res = turtle.equipLeft()
    elseif args[1] == "turtle.equipRight" then
        res = turtle.equipRight()
    elseif args[1] == "turtle.inspect" then
        _, res = turtle.inspect()
    elseif args[1] == "turtle.inspectUp" then
        _, res = turtle.inspectUp()
    elseif args[1] == "turtle.inspectDown" then
        _, res = turtle.inspectDown()
    elseif args[1] == "turtle.getItemDetail" then
        if #args == 1 then
            res = turtle.getItemDetail(tonumber(args[2]), args[3] == "true")
        else
            res = turtle.getItemDetail()
        end

        if res == nil then
            res = false
        end
    elseif args[1] == "turtle.sleep" then
        sleep(tonumber(args[2]))
        sock.send("true")
        return
    end

    sock.send(textutils.serializeJSON(res))
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