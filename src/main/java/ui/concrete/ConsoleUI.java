package ui.concrete;

import ui.UI;

public class ConsoleUI implements UI {

	@Override
	public void push(String message, Object... arguments) {
		System.out.format(message+"%n", arguments);
	}

}
