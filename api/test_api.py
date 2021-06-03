from pathlib import Path
import pytest
import os

from api import app

@pytest.fixture
def client():
    """Fixed method called at start of every test case"""
    # BASE_DIR = Path(__file__).resolve().parent.parent
    app.config["TESTING"] = True

    yield app.test_client() # tests run here

def test_rootpage_is_empty(client):
    response = client.get("/", content_type="html/text")
    assert response.status_code == 404