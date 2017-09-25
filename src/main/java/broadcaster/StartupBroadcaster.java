package broadcaster;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class StartupBroadcaster {

	@Autowired
	private SimpMessagingTemplate comm;

	private int i = 0;

	@Scheduled(initialDelay=3000, fixedRate=3000)
	public void broadcast() {
		System.out.println("Broadcast "+i);
		comm.convertAndSend("/topic/newsfeed", "Some random message "+ (i++));
	}
}