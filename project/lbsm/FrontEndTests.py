import selenium
from pprint import pprint
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
import unittest

import urllib.request

class FrontEndTests(unittest.TestCase):
    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.get('http://localhost:8080')
        f = urllib.request.urlopen("http://localhost:3000/cleardatabase")
        
        browser = self.browser
        # resgister_link is a list, therefore we have to take out the first element
        register_link = browser.find_elements_by_id('signup-link')
        register_link[0].click()      
        
        email = "hamody.mahir1998@gmail.com"
        username = "moe"
        password = "moe"
        
        email_box = browser.find_element_by_id('input-1')
        username_box = browser.find_element_by_id('input-2')
        password_box = browser.find_element_by_id('input-3')

        email_box.send_keys(email)
        username_box.send_keys(username)
        password_box.send_keys(password)
        
        sign_up_button = browser.find_element_by_id('sign-up-button')
        sign_up_button.click()

        
    
    def test_001_register(self):
        browser = self.browser
        # resgister_link is a list, therefore we have to take out the first element
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
        
    def test_002_login(self):
        browser = self.browser

        username = "moe"
        password = "moe"
        
        username_box = browser.find_element_by_id('input-1')
        password_box = browser.find_element_by_id('input-2')

        username_box.send_keys(username)
        password_box.send_keys(password)
        
        sign_up_button = browser.find_element_by_id('login-button')
        sign_up_button.click()

        # Check that we redirect correctly
        assert browser.current_url == 'http://localhost:8080/#/home'

    def test_003_logout(self):
        self.test_002_login()
        
        browser = self.browser
        logout_link = browser.find_element_by_id('logout-link')
        logout_link.click()

        # Check that we redirect correctly
        assert browser.current_url == 'http://localhost:8080/#/login'

    def test_004_search_and_add_friends(self):
        self.test_001_register()
        self.test_002_login()
        browser = self.browser

        friends_list_link = browser.find_element_by_id('friends-list-link')
        friends_list_link.click()

        # Search for friend
        search_bar = browser.find_element_by_id('search-bar')
        search_bar.send_keys("eric")

        browser.implicitly_wait(1)
        # Add friend through list search
        add_friend_btn = browser.find_element_by_id('add-friend-btn')
        add_friend_btn.click()

        # Check if add friend button turned to a cancel request button
        assert "Cancel request" in browser.page_source

    """
    def tearDown(self):
        self.browser.quit()
    """

if __name__ == "__main__":
    unittest.main()

