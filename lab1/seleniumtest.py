import selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
import unittest

class Lab1Tests(unittest.TestCase):
    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.get('file:///home/eric/courses/tdp013/lab1/index.html')

    def test_error(self):
        browser = self.browser
        sendbutton = browser.find_element_by_id('sendbutton')

        sendbutton.click()
        errmsg = "Error: Too many or too few characters. Max 140."
        assert errmsg in browser.page_source

        errbutton = browser.find_element_by_id('errbtn')
        errbutton.click()

        assert errmsg not in self.browser.page_source

        inputbox = browser.find_element_by_id('inputbox')
        teststr = "A" * 141

        inputbox.send_keys(teststr)
        sendbutton.click()
        assert errmsg in browser.page_source


    def test_send_message(self):
        browser = self.browser
        message1 = "Testmeddelande1"
        message2 = "Testmeddelande 2"

        inputbox = browser.find_element_by_id('inputbox')
        inputbox.send_keys(message1)
        sendbutton = browser.find_element_by_id('sendbutton')
        sendbutton.click()

        messagelist = browser.find_element_by_id('messagelist')

        assert message1 in browser.page_source


    def tearDown(self):
        self.browser.close()


if __name__ == "__main__":
    unittest.main()
