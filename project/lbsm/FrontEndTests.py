import selenium
from pprint import pprint
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
import unittest

import urllib.request

class FrontEndTests(unittest.TestCase):
    
    browser = webdriver.Firefox()
    browser.get('http://localhost:8080')
    
    def test_001_register(self):
        # Clear database
        urllib.request.urlopen("http://localhost:3000/cleardatabase")

        browser = self.browser
        # register_link is a list, therefore we have to take out the first element
        register_link = browser.find_elements_by_id('signup-link')
        register_link[0].click()      
        
        email = "eric.eric@gmail.com"
        username = "eric"
        password = "eric"
        
        email_box = browser.find_element_by_id('input-1')
        username_box = browser.find_element_by_id('input-2')
        password_box = browser.find_element_by_id('input-3')

        email_box.send_keys(email)
        username_box.send_keys(username)
        password_box.send_keys(password)
        
        sign_up_button = browser.find_element_by_id('sign-up-button')
        sign_up_button.click()

        # Check that we redirect correctly
        assert browser.current_url == 'http://localhost:8080/#/login'

        ################################ REGISTER simon ###################################
        register_link = browser.find_elements_by_id('signup-link')
        register_link[0].click()      
        
        email = "simon.simon@gmail.com"
        username = "simon"
        password = "simon"
        
        email_box = browser.find_element_by_id('input-1')
        username_box = browser.find_element_by_id('input-2')
        password_box = browser.find_element_by_id('input-3')

        email_box.send_keys(email)
        username_box.send_keys(username)
        password_box.send_keys(password)
        
        sign_up_button = browser.find_element_by_id('sign-up-button')
        sign_up_button.click()

        # Check that we redirect correctly
        assert browser.current_url == 'http://localhost:8080/#/login'

        ############################### TRY to register simon again #######################
        register_link = browser.find_elements_by_id('signup-link')
        register_link[0].click()      
        
        email = "simon.simon@gmail.com"
        username = "simon"
        password = "simon"
        
        email_box = browser.find_element_by_id('input-1')
        username_box = browser.find_element_by_id('input-2')
        password_box = browser.find_element_by_id('input-3')

        email_box.send_keys(email)
        username_box.send_keys(username)
        password_box.send_keys(password)
        
        sign_up_button = browser.find_element_by_id('sign-up-button')
        sign_up_button.click()

        # Check that we redirect correctly
        assert browser.current_url == 'http://localhost:8080/#/sign-up'
        assert 'Username already taken' in browser.page_source

        ################################ REGISTER anna ####################################
        email = "anna.anna@gmail.com"
        username = "anna"
        password = "anna"
        
        email_box = browser.find_element_by_id('input-1')
        username_box = browser.find_element_by_id('input-2')
        password_box = browser.find_element_by_id('input-3')

        email_box.send_keys(email)
        username_box.send_keys(username)
        password_box.send_keys(password)
        
        sign_up_button = browser.find_element_by_id('sign-up-button')
        sign_up_button.click()

        # Check that we redirect correctly
        assert browser.current_url == 'http://localhost:8080/#/login'
 
    def test_002_login(self):
        browser = self.browser

        username_box = browser.find_element_by_id('input-1')
        password_box = browser.find_element_by_id('input-2')

        username = "moe"
        password = "moe"
        
        username_box.send_keys(username)
        password_box.send_keys(password)
        
        login_button = browser.find_element_by_id('login-button')
        login_button.click()

        # Check when input is wrong
        assert browser.current_url == 'http://localhost:8080/#/login'
        assert 'Wrong username or password! Please try again' in browser.page_source

        ############################################################################
        username_box = browser.find_element_by_id('input-1')
        password_box = browser.find_element_by_id('input-2')

        username = "eric"
        password = "eric"
        
        username_box.send_keys(username)
        password_box.send_keys(password)
        
        login_button = browser.find_element_by_id('login-button')
        login_button.click()

        # Check when input is right and redirect correctly
        assert browser.current_url == 'http://localhost:8080/#/home'
        
    def test_004_search_and_add_friends(self):
        browser = self.browser

        friends_list_link = browser.find_element_by_id('friends-list-link')
        friends_list_link.click()

        # Search for friend
        search_bar = browser.find_element_by_id('search-bar')
        search_bar.send_keys("anna")

        browser.implicitly_wait(2)
        # Add friend through list search
        add_friend_btn = browser.find_element_by_id('add-friend-btn')
        add_friend_btn.click()

        # Check if add friend button turned to a cancel request button
        assert "Cancel request" in browser.page_source

    def test_005_accept_friend_req(self):
        browser = self.browser

        # Log out to answer request from friend
        logout_link = browser.find_element_by_id('logout-link')
        logout_link.click()

        username_box = browser.find_element_by_id('input-1')
        password_box = browser.find_element_by_id('input-2')

        username = "anna"
        password = "anna"
        
        username_box.send_keys(username)
        password_box.send_keys(password)
        
        login_button = browser.find_element_by_id('login-button')
        login_button.click()

        # Add friend through friends search
        add_friend_btn = browser.find_element_by_id('accept-req-btn')
        add_friend_btn.click()

    def test_006_post_on_friends_wall(self):
        browser = self.browser

        # Log back in to user to continue testing
        logout_link = browser.find_element_by_id('logout-link')
        logout_link.click()

        username_box = browser.find_element_by_id('input-1')
        password_box = browser.find_element_by_id('input-2')

        username = "eric"
        password = "eric"
        
        username_box.send_keys(username)
        password_box.send_keys(password)
        
        login_button = browser.find_element_by_id('login-button')
        login_button.click()
    
        # Check if anna is added to friendslist
        friend_link = browser.find_element_by_class_name('friend-link')
        assert 'anna' == friend_link.text

        # Now go to annas wall and post something
        friend_link.click()
        text_area = browser.find_element_by_id('text-area')
        message = 'HEJ ANNA!!!!!!!!'
        text_area.send_keys(message)

        post_button = browser.find_element_by_id('post-button')
        post_button.click()

        # Check if the message has been posted
        assert message in browser.page_source

    def test_007_remove_friend(self):
        browser = self.browser

        remove_friend_btn = browser.find_element_by_id('rmv-friend-btn')
        remove_friend_btn.click()

        # Check that friend was removed succefully
        assert "You are not friends with anna!" in browser.page_source
        assert browser.find_element_by_id('add-friend-btn').text == "Add friend"

    def test_999_logout(self):
        browser = self.browser
        logout_link = browser.find_element_by_id('logout-link')
        logout_link.click()

        # Check that we redirect correctly
        assert browser.current_url == 'http://localhost:8080/#/login'
        browser.quit()

if __name__ == "__main__":
    unittest.main()

