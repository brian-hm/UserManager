package com.brian.userManager.exceptions;

import java.util.ArrayList;
import java.util.List;

public class ValidationError extends Error{
	private static final long serialVersionUID = 1L;
	private List<Message> errors = new ArrayList<>();
	
	public ValidationError(Integer status, String msg, Long timeStamp) {
        super(status, msg, timeStamp);
    }
	
	public List<Message> getErros(){
		return errors;
	}
	
	public void addError(String fieldName, String message){
		errors.add(new Message(fieldName, message));
	}
}
