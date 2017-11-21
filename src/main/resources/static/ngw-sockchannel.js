angular.module('ngw-sockchannel', [])
    .factory('sockchannel', [function(){
        var create = function(socketEndpoint) {
            var channel; //late binding

            var socket = new SockJS(socketEndpoint);
            var stompClient = Stomp.over(socket);

            stompClient.debug = false;
            var messageHandlers = [];


            var connect = function (topic) {
                stompClient.connect({}, function (frame) {
                    stompClient.subscribe(topic, function(message) {
                        for (var i=0; i<messageHandlers.length; i++)
                            messageHandlers[i](message);
                    });
                });
                return channel;
            };

            var disconnect = function () {
                stompClient.disconnect();
                return channel;
            };


            var onAny = function (action) {
                messageHandlers.push(action);
                return channel;
            };

            var on = function (operand, action) {
                messageHandlers.push(function (message) {
                    if (message === operand)
                        action(message);
                });
                return channel;
            };

            var using; //recursive usage
            using = function(accessor) {
                var handlerBuilder; //late-binding
                handlerBuilder = {
                    onAny: function(action) {
                        onAny(action);
                        return handlerBuilder;
                    },
                    on: function(operand, action) {
                        messageHandlers.push(function (message) {
                            if (accessor(message) === operand)
                                action(message);
                        });
                        return handlerBuilder;
                    },
                    using: using
                };
                return handlerBuilder;
            };


            channel = {
                connect: connect,
                disconnect: disconnect,
                onAny: onAny,
                on: on,
                using: using
            };

            return channel;
        };

        var connect = function (socketEndpoint, feedTopic) {
            var channel = create(socketEndpoint);
            channel.connect(feedTopic);
            return channel;
        };


        return {
            create: create,
            connect: connect
        }
    }]);
